import React from 'react';
import _ from 'lodash';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import LineSwitcher from '../../components/LineSwitcher/LineSwitcher.js';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        const {x} = this.props.chart;
        const xValues = Object.values(x);
        this.minV = Math.min(...xValues);
        this.maxV = Math.max(...xValues);
        this.miniChartHeight = 16 * 4; // 1 rem = 16 px
        this.defaultMin = 6;
        this.canvWidth = '700';
        this.state = {
            currentValue: {min: this.minV, max: this.minV + 6},
        };
        this.getRange(this.state.currentValue);
        this.redrawChart = this.redrawChart.bind(this);
        this.drawMiniChart = this.drawMiniChart.bind(this);
    }

    componentDidMount() {
        this.markUpChart();
        this.drawMiniChart();
    }

    markUpChart() {
        const {chartTitle} = this.props.chart;
        const canvElement = document.getElementById(chartTitle);
        const ctx = canvElement.getContext('2d');
        const idt = Math.round(canvElement.height / 13);
        const [lineHeight, dateWidth, height, width] = this.markUpArea(canvElement, ctx, idt);
        this.drawLines(canvElement, height, width, idt, lineHeight, dateWidth);
    }

    markUpArea(canvElement, ctx, idt) {
        const canvWidth = canvElement.width;
        const canvHeight = canvElement.height;
        const dynamicFont = Math.round(canvWidth / 50);
        ctx.strokeStyle = '#c5c5c5';
        ctx.lineWidth = 0.5;
        ctx.font = `${dynamicFont}px Verdana`;
        ctx.fillStyle = '#9e9e9e';
        const {axisY, axisX} = this.props.chart.rangeToShow.axes;
        const pointsAreaHeight = canvHeight - idt;
        const pointsAreaWidth = canvWidth - idt;
        const lineYDist = Math.round(pointsAreaHeight / 6);
        const axisYMarkAboveLineIndent = 8;
        const lineXDist = Math.floor(pointsAreaWidth / 6);
        const axisXMarkBelowLineIndent = 20;
        let j = 0;
        for (let i = 0; i < 6; i++) {
            const y = pointsAreaHeight - (lineYDist * i);
            const x = lineXDist * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.fillText(axisY[i], 0, y - axisYMarkAboveLineIndent);
            ctx.fillText(axisX[j], lineXDist / 4 + x + idt, pointsAreaHeight + axisXMarkBelowLineIndent);
            ctx.lineTo(canvWidth, y);
            ctx.stroke();
            j += 1;
        }
        return [lineYDist, lineXDist, pointsAreaHeight, pointsAreaWidth];
    }

    drawLines(canv, height, width, idt, lineHeight, dateWidth, mini = false) {
        const {rangeToShow, disabled} = this.props.chart;
        const {axes} = rangeToShow;
        const {axisY} = axes;
        let lines, range, x, step = 1;
        if (mini) {
            ({lines, x} = this.props.chart);
            const disabledKeys = Object.keys(disabled);
            range = Object.values(_.sortBy(x));
            let tempLines = {};
            for (let line in lines) {
                if (disabledKeys.indexOf(line) === -1) {
                    tempLines = {...tempLines, [line]: lines[line]};
                }
            }
            lines = {...tempLines};
        } else {
            ({lines, range, step} = rangeToShow);
        }
        const lineValues = Object.values(lines).reduce((line1, line2) => line1.concat(line2));
        const maxValue = Math.max(...lineValues);
        const rangeLength = range.length;
        const widthPart = dateWidth / step;
        const heightValueToPx = lineHeight / (mini ? Math.ceil(maxValue / 6) : axisY[1]);
        for (let line in lines) {
            this.drawLine(canv, line, lines[line], dateWidth, heightValueToPx,
                rangeLength, widthPart, height, idt, mini);
        }
    }

    drawLine(...args) {
        const [canv, name, line, dateWidth,
            heightValueToPx, rangeLength,
            widthPart, height, idt, mini] = [...args];
        const ctx = canv.getContext('2d');
        ctx.strokeStyle = this.props.chart.colors[name];
        ctx.lineWidth = mini ? 1 : rangeLength > 30 ? 2 : 3;
        let dateInd = 1;
        const startPosX = mini ? idt * 3 : idt + (dateWidth === widthPart ? widthPart / 2 : widthPart);
        const startPosY = height - heightValueToPx * line[0];
        let currentPos = [startPosX, startPosY];
        ctx.beginPath();
        ctx.lineCap = 'square';
        while (dateInd !== rangeLength) {
            const dot = line[dateInd];
            if (!dot) {
                dateInd++;
                continue;
            }
            ctx.moveTo(currentPos[0], currentPos[1]);
            let x = currentPos[0];
            let y = height - heightValueToPx * dot;
            x += widthPart;
            ctx.lineTo(x, y);
            currentPos = [x, y];
            dateInd++;
        }
        ctx.stroke();
    }

    placeLineSwitchers() {
        const {chart, mode, switchLine} = this.props;
        const {series_names} = chart;
        const lineNames = Object.keys(series_names);
        return lineNames
            .map(line =>
                <LineSwitcher key={`line-switcher-${line}`} chart={chart} mode={mode} lineName={line}
                              switchLine={switchLine} redrawChart={this.redrawChart}
                              drawMiniChart={this.drawMiniChart}/>
            )
    }

    redrawChart() {
        const {chartTitle} = this.props.chart;
        const canvElement = document.getElementById(chartTitle);
        const ctx = canvElement.getContext('2d');
        ctx.clearRect(0, 0, canvElement.width, canvElement.height);
        this.markUpChart();
    }

    getRange(value) {
        const {chart} = this.props;
        const {chartTitle, x, lines, disabled} = chart;
        const {min, max} = value;
        let range = [];
        for (let i = min; i < max; i++) {
            range.push(this.getKeyByValue(x, i));
        }
        this.props.changeRange(chartTitle, range, x, lines, disabled)
    }

    getKeyByValue(obj, value) {
        return Object.keys(obj).find(key => obj[key] === value);
    }

    drawMiniChart() {
        const {chartTitle, x} = this.props.chart;
        const xKeysLength = Object.keys(x).length;
        const canvElement = document.getElementById(`mini-${chartTitle}`);
        const ctx = canvElement.getContext('2d');
        const canvHeight = canvElement.height;
        const canvWidth = canvElement.width;
        ctx.clearRect(0, 0, canvElement.width, canvElement.height);
        const idt = Math.round(canvHeight / 13);
        const height = canvHeight - idt;
        const width = canvWidth - idt;
        const lineHeight = Math.round(height / 6);
        const dateWidth = width / xKeysLength;
        this.drawLines(canvElement, height, width, idt, lineHeight, dateWidth, true);
    }

    onChangeInputRange(currentValue) {
        const tempMin = currentValue.min;
        const tempMax = currentValue.max;
        const maximumMin = this.maxV - this.defaultMin;
        let min = tempMin < this.minV ? this.minV :
            tempMin > maximumMin ? maximumMin : tempMin;
        const max = tempMax > this.maxV ? this.maxV :
            tempMax < this.defaultMin ? this.defaultMin : tempMax;
        const tempCheckDivis = (max - min) % this.defaultMin;
        min += tempCheckDivis;
        currentValue = {min, max};
        this.setState({currentValue});
        this.getRange(currentValue);
        this.redrawChart();
    }

    render() {
        const {chartTitle} = this.props.chart;
        return (
            <div className="chart-wrapper">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <h2 className="chart-title">{chartTitle}</h2>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <canvas id={chartTitle} width={this.canvWidth} height='400'/>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <canvas id={`mini-${chartTitle}`} className="mini-chart" width={this.canvWidth}
                            height={this.miniChartHeight}/>
                </div>
                <InputRange minValue={this.minV} maxValue={this.maxV} draggableTrack={true}
                            value={this.state.currentValue}
                            onChange={currentValue => this.onChangeInputRange(currentValue)}
                            formatLabel={() => {
                            }} allowSameValues={false} step={6}/>
                <div className="switchers-wrapper">
                    {this.placeLineSwitchers()}
                </div>
            </div>
        )
    }
}

export default Chart;
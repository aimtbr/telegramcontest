import React from 'react';

class Chart extends React.Component {
    componentDidMount() {
        const { chartTitle, x, lines } = this.props.chart;
        const range = ['Nov 17', 'Nov 18', 'Nov 19', 'Nov 20', 'Nov 21', 'Nov 22'];
        this.props.changeRange(chartTitle, range, x, lines);
        this.markUpChart();
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
        ctx.strokeStyle = '#CCC';
        ctx.font = `${dynamicFont}px Verdana`;
        ctx.fillStyle = '#888';
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

    drawLines(canv, height, width, idt, lineHeight, dateWidth) {
        const { axisY } = this.props.chart.rangeToShow.axes;
        const { lines, range, step } = this.props.chart.rangeToShow;
        const rangeLength = range.length;
        const widthPart = dateWidth / step;
        const heightValueToPx = lineHeight / axisY[1];
        for (let line in lines){
            this.drawLine(canv, line, lines[line], dateWidth, heightValueToPx, rangeLength, widthPart, height, idt);
        }
    }

    drawLine(...args){
        const [canv, name, line, dateWidth,
            heightValueToPx, rangeLength,
            widthPart, height, idt ] = [...args];
        const ctx = canv.getContext('2d');
        const lineColor = this.props.chart.colors[name];
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 3;
        let dateInd = 1;
        let onStep = true;
        let onStepCounter = 0;
        const startPosX = idt + (dateWidth / 2);
        const startPosY = height - heightValueToPx * line[0];
        let currentPos = [startPosX, startPosY];
        ctx.beginPath();
        ctx.lineCap = 'square';
        while (dateInd !== rangeLength) {
            ctx.moveTo(currentPos[0], currentPos[1]);
            let x = currentPos[0];
            let y = height - heightValueToPx * line[dateInd];
            if (!onStep){
                x += widthPart;
                onStepCounter++;
            }else {
                x += dateWidth;
                onStep = false;
                onStepCounter = 0;
            }
            ctx.lineTo(x, y);
            currentPos = [x, y];
            dateInd++;
        }
        ctx.stroke();
    }

    render() {
        return <canvas id={this.props.chart.chartTitle} width='700' height='400'/>
    }
}

export default Chart;
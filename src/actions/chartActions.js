import * as action from './actions';

const sendLoading = () => ({type: action.MAKE_LOADING});
const sendFailure = message => ({type: action.MAKE_FAILURE, error: message});

const changeRangeSUCCESS = (chartTitle, data) => ({
    type: action.CHANGE_RANGE_SUCCESS, chartTitle, payload: data
});
const switchLineSUCCESS = (switched, chartTitle) => ({
    type: action.SWITCH_LINE_SUCCESS, payload: switched, chartTitle
});
const getDataSUCCESS = data => ({
    type: action.GET_DATA_SUCCESS, payload: {charts: data}
});

export const switchMode = (dispatch, nightMode) => {
    dispatch({type: action.SWITCH_MODE, payload: {nightMode: !nightMode}});
};

export function changeRange(dispatch, chartTitle, range, axisX, lines, disabled) {
    let rng = {};
    const disabledNames = Object.keys(disabled);
    const dateValues = [];
    let tempDisabled = {};
    for (let date of range) {
        dateValues.push(axisX[date]);
    }
    for (let line in lines) {
        let lineValues = dateValues.map(val => lines[line][val]);
        if (disabledNames.indexOf(line) === -1) {
            rng = {...rng, [line]: lineValues}
        } else {
            tempDisabled = {...tempDisabled, [line]: lineValues}
        }
    }
    let [step, axes] = formatAxesInput({...rng, 'x': range});
    let rangeToShow = {step, range: range, lines: rng, axes};
    dispatch(changeRangeSUCCESS(chartTitle, {rangeToShow, disabled: tempDisabled}))
}

export function getData(dispatch) {
    dispatch(sendLoading());
    fetch('chart_data.json',
        {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => formatData(data))
        .then(formattedData => {
            dispatch(getDataSUCCESS(formattedData))
        })
        .catch(err => {
            dispatch(sendFailure(err.message))
        });
}

function formatData(data) {
    const charts = [];
    for (let key in data) {
        let currentChart = data[key];
        let chartTitle = `chart${+key + 1}`;
        let colors = currentChart.colors;
        let series_names = currentChart.names;
        let chartCols = currentChart.columns;
        let lines = {};
        let x = {};
        chartCols.forEach(arr => {
            let values = arr.slice(1);
            let column = {[arr[0]]: values};
            if (arr[0] !== 'x') {
                lines = {...lines, ...column};
            } else {
                values.map((milliSec, ind) => {
                    let date = new Date(milliSec).toDateString().slice(4, -5);
                    x = {...x, [date]: ind};
                });
            }
        });
        let chart = {chartTitle, series_names, x, lines, colors, disabled: {}};
        charts.push(chart)
    }
    return charts;
}

export function switchLine(dispatch, chartTitle, lineName, rangeToShow, disabled) {
    let rangeCopy = rangeToShow;
    let disabledCopy = disabled;
    Promise.resolve(dispatch(sendLoading()))
        .then(() => {
            const {lines, axes} = rangeCopy;
            const {axisX} = axes;
            const disabledCopyKeys = Object.keys(disabledCopy);
            let lineToSwitch;
            if (disabledCopyKeys.indexOf(lineName) !== -1) {
                lineToSwitch = {[lineName]: disabledCopy[lineName]};
                delete disabledCopy[lineName];
                rangeCopy.lines = {...lines, ...lineToSwitch};
            } else {
                const linesKeys = Object.keys(lines);
                if (linesKeys.length === 1) {
                    return;
                }
                lineToSwitch = {[lineName]: lines[lineName]};
                delete rangeCopy.lines[lineName];
                disabledCopy = {...disabledCopy, ...lineToSwitch};
            }
            [, rangeCopy.axes] = formatAxesInput({...rangeCopy.lines, 'x': axisX});
            dispatch(switchLineSUCCESS({rangeToShow: rangeCopy, disabled: disabledCopy}, chartTitle));
        })
        .catch(e => dispatch(sendFailure(e.message)));
}

function formatAxesInput(columns) {
    let columnKeys = Object.keys(columns);
    if (columnKeys.length < 2) throw new Error('Invalid input data');
    let keysY = columnKeys.filter(key => key.indexOf('y') !== -1);
    let y = [];
    keysY.map(key => y = [...y, ...columns[key]]);
    const x = columns['x'];
    const xLength = x.length;
    let axisX = [];
    let axisY = [0,];
    let markY = Math.ceil(Math.max(...y) / 6);
    for (var counter = 2; counter < 7; counter++) {
        axisY.push(markY * counter);
    }
    const step = Math.round(xLength / 6);
    const rem = xLength % 6;
    const xLengthFormatted = xLength - rem;
    for (counter = step - 1; counter < xLengthFormatted; counter += step) {
        axisX.push(x[counter]);
    }
    const axes = {axisX, axisY};
    return [step, axes]
}
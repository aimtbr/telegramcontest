import * as action from './actions';

const sendLoading = () => ({type: action.MAKE_LOADING});
const sendFailure = message => ({type: action.MAKE_FAILURE, error: message});
const switchMode = dayMode => ({type: action.SWITCH_MODE, payload: {dayMode: !dayMode}}); //TODO IMPLEMENT

const changeRangeSUCCESS = (chartTitle, range) => ({
    type: action.CHANGE_RANGE_SUCCESS, chartTitle, payload: range
});
const switchSeriesSUCCESS = series => ({
    type: action.SWITCH_SERIES_SUCCESS, payload: {disabledSeries: series}
});
const getDataSUCCESS = data => ({
    type: action.GET_DATA_SUCCESS, payload: {charts: data}
});

export function changeRange(dispatch, chartTitle, range, axisX, lines) {
    let rng = {};
    const dateValues = [];
    for (let date of range) {
        dateValues.push(axisX[date]);
    }
    for (let line in lines) {
        let lineValues = dateValues.map(val => lines[line][val]);
        rng = {...rng, [line]: lineValues}
    }
    let [step, axes] = formatAxesInput({...rng, 'x': range});
    let rangeToShow = {step, range: range, lines: rng, axes};
    dispatch(changeRangeSUCCESS(chartTitle, rangeToShow))
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
        let columns = {};
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
        let chart = {chartTitle, series_names, x, lines, colors};
        charts.push(chart)
    }
    return charts;
}

export function switchSeries(dispatch, series, disabledSeries, chartTitle) { // 'series' should be passed like an object
    Promise.resolve(dispatch(sendLoading()))
        .then(() => {
            let disabledSeriesTemp = {...disabledSeries};
            if (disabledSeriesTemp[chartTitle] === undefined) {
                disabledSeriesTemp = {...disabledSeriesTemp, [chartTitle]: {...series}};
            } else {
                let key = Object.keys(series)[0];
                disabledSeriesTemp[chartTitle].hasOwnProperty(key) ?
                    delete disabledSeriesTemp[chartTitle][key] :
                    disabledSeriesTemp = {
                        ...disabledSeriesTemp,
                        [chartTitle]: {...disabledSeriesTemp[chartTitle], ...series}
                    }
            }
            dispatch(switchSeriesSUCCESS(disabledSeriesTemp))
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
    let markY = Math.ceil(Math.max(...y) / 6) + 1;
    for (var counter = 1; counter < 6; counter++) {
        axisY.push(markY * counter);
    }
    const step = Math.floor(xLength / 6);
    for (counter = 0; counter < xLength; counter += step) {
        axisX.push(x[counter]);
    }
    const axes = {axisX, axisY};
    return [step, axes]
}
import * as action from './actions';

const sendLoading = () => ({type: action.MAKE_LOADING});
const sendFailure = message => ({type: action.MAKE_FAILURE, error: message});
const switchMode = dayMode => ({type: action.SWITCH_MODE, payload: {dayMode: !dayMode}});
const changeRangeSUCCESS = range => ({
    type: action.CHANGE_RANGE_SUCCESS, payload: {rangeToShow: range}
});
const switchSeriesSUCCESS = series => ({
    type: action.SWITCH_SERIES_SUCCESS, payload: {disabledSeries: series}
});
// const changeAxesSUCCESS = (x, y) => ({
//     type: action.CHANGE_AXES, payload: {axisX: x, axisY: y}
// });
const getDataSUCCESS = data => ({type: action.GET_DATA_SUCCESS, payload: {charts: data}});

export function changeRange(dispatch, range) {
}

export function getData(dispatch) {
    dispatch(sendLoading());
    fetch('chart_data.json', {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            return formatData(data)
        })
        .then(formattedData => {
            dispatch(getDataSUCCESS(formattedData))
        })
        .catch(err => {
            dispatch(sendFailure(err.message))
        });
}

function formatData(data) {
    let charts = {};
    for (let key in data) {
        let currentChart = data[key];
        let chartTitle = `chart${+key + 1}`;
        let columns = {};
        let chartCols = currentChart.columns;
        chartCols.forEach(arr => {
            let column = {[arr[0]]: arr.slice(1)};
            columns = {...columns, ...column}
        });
        let colors = currentChart.colors;
        let series_names = currentChart.names;
        let axes = formatAxesInput(columns);
        let chart = {[chartTitle]: {series_names, columns, axes, colors}};
        charts = {...charts, ...chart};
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

// rewrite axes formatting
function formatAxesInput(columns) {
    let columnKeys = Object.keys(columns);
    if (columnKeys.length < 2) throw new Error('Invalid input data');
    let axes = {};
    let keysY = columnKeys.filter(key => key.indexOf('y') !== -1);
    let firstSeries = [];
    keysY.map(key => firstSeries = [...firstSeries, ...columns[key]]);
    let secondSeries = columns['x'];
    let axisX = [];
    let axisY = [0,];
    let markY = Math.max(...firstSeries) / 6;
    for (var counter = 1; counter < 6; counter++) {
        axisY.push(markY * counter);
    }
    counter = 0;
    let currentElement = secondSeries[counter];
    while (currentElement !== undefined) {
        currentElement = secondSeries[counter];
        axisX.push(new Date(currentElement).toDateString().slice(4, -5));
        counter += 2;
    }
    axes = {axisX, axisY};
    return axes
}
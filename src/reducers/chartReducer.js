import * as constant from "../actions/actions";

const initialState = {
    charts: [], // {chartTitle, series_names, axes {axisX, axisY}, lines, rangeToShow, disabled, colors}
    nightMode: false,
    error: false,
    loading: false,
};

export const chartReducer = (state = initialState, action) => {
    switch (action.type) {
        case constant.MAKE_LOADING: {
            return {...state, loading: true, error: false}
        }

        case constant.MAKE_FAILURE: {
            return {...state, loading: false, error: action.error}
        }

        case constant.CHANGE_RANGE_SUCCESS: {
            const {charts} = state;
            for (let chart of charts) {
                if (chart.chartTitle === action.chartTitle) {
                    const {rangeToShow, disabled} = action.payload;
                    chart.rangeToShow  = rangeToShow;
                    chart.disabled = disabled;
                    return {...state, charts};
                }
            }
            return state
        }

        case constant.SWITCH_LINE_SUCCESS: {
            const {charts} = state;
            for (let chart of charts){
                if (chart.chartTitle === action.chartTitle){
                    const {rangeToShow, disabled} = action.payload;
                    chart.rangeToShow = rangeToShow;
                    chart.disabled = disabled;
                    return {...state, charts, loading: false};
                }
            }
            return state
        }

        case constant.SWITCH_MODE: {
            return {...state, ...action.payload}
        }

        case constant.CHANGE_AXES: {
            return {...state, ...action.payload}
        }

        case constant.GET_DATA_SUCCESS: {
            return {...state, ...action.payload, loading: false}
        }

        default:
            return state
    }
};
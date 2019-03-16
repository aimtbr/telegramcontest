import * as constant from "../actions/actions";

const initialState = {
    charts: [], // consists of objects like {chartTitle, series_names, axes {axisX, axisY}, lines, rangeToShow, colors}
    disabledSeries: {},
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
                    chart.rangeToShow  = {...action.payload};
                    return {...state, charts};
                }
            }
            return state
        }

        case constant.SWITCH_SERIES_SUCCESS: {
            return {...state, ...action.payload, loading: false}
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
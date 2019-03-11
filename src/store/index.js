import {createStore} from "redux";
import {applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {rootReducer} from '../reducers';

const logger = createLogger();

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));
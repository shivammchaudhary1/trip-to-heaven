import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import {Reducer} from "./reducer"

import thunk from "redux-thunk";

const rootReducer = combineReducers({Reducer})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
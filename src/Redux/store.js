import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";

import {Reducer} from "./reducer"
import { OfferReducer } from "./Offers/offer.reducer"

const rootReducer = combineReducers({Reducer,OfferReducer})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
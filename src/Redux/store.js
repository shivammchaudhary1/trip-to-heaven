import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";

import { Reducer } from "./reducer";
import { OfferReducer } from "./Offers/offer.reducer";
import { LoginReducer } from "./Authantication/auth.reducer";
import { reducerHotel } from "./HotelRedux/reducerHotel";

const rootReducer = combineReducers({
  Reducer,
  OfferReducer,
  LoginReducer,
  reducerHotel,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

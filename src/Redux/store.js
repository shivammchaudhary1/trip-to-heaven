import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";

import { FlightReducer } from "./AdminFlights/reducer";
import { HotelReducer } from "./AdminHotel/reducer";
import { OfferReducer } from "./Offers/offer.reducer";
import { LoginReducer } from "./Authantication/auth.reducer";
import { reducerHotel } from "./HotelRedux/reducerHotel";

const rootReducer = combineReducers({
  FlightReducer,
  HotelReducer,
  OfferReducer,
  LoginReducer,
  reducerHotel,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

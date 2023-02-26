import {
  GET_HOTEL_FAILURE,
  GET_HOTEL_REQUEST,
  GET_HOTEL_SUCCESS,
} from "./actionTypeHotel";

export const hotelRequestAction = () => {
  return { type: GET_HOTEL_REQUEST };
};

export const hotelSuccessAction = (payload) => {
  return { type: GET_HOTEL_SUCCESS, payload };
};

export const hotelFailureAction = () => {
  return { type: GET_HOTEL_FAILURE };
};

import {
  GET_HOTEL_FAILURE,
  GET_HOTEL_REQUEST,
  GET_HOTEL_SUCCESS,
} from "./actionTypeHotel";

const initialState = {
  hotel: [],
  isLoading: false,
  isError: false,
};

export const reducerHotel = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_HOTEL_REQUEST: {
      return { ...state, isLoading: true };
    }
    case GET_HOTEL_SUCCESS: {
      return { ...state, isLoading: false, hotel: payload };
    }
    case GET_HOTEL_FAILURE: {
      return { ...state, isLoading: false, isError: true };
    }
    default:
      return state;
  }
};

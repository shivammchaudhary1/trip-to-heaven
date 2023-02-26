import {
  HOTEL_FAILURE,
  HOTEL_REQUEST,
  GET_HOTEL_SUCCESS,
  POST_HOTEL_SUCCESS,
  NEW_GET_HOTELS_SUCCESS,
  DELETE_HOTEL,
} from "./actionType";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const HotelReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HOTEL_REQUEST:
      return { ...state, isLoading: true };

    case HOTEL_FAILURE:
      return { ...state, isError: true };

    case GET_HOTEL_SUCCESS:
      return { ...state, isLoading: false, flight: payload };

    case POST_HOTEL_SUCCESS:
      return { ...state, isLoading: false, flight: payload };

    case NEW_GET_HOTELS_SUCCESS:
      return {
        ...state,
        isLoading: (state.isLoading = false),
        data: (state.data = payload),
      };

    case DELETE_HOTEL: {
      const filterFlight = state.data.filter((ele) => ele.id != payload);
      return { ...state, data: filterFlight };
    }

    default:
      return state;
  }
};

import axios from "axios";
import {
  DELETE_FLIGHTS,
  FETCH_FLIGHTS,
  FLIGHT_FAILURE,
  FLIGHT_REQUEST,
  GET_FLIGHT_SUCCESS,
  POST_FLIGHT_SUCCESS,
} from "./actionType";

export const getFlightSuccess = (payload) => {
  return { type: GET_FLIGHT_SUCCESS, payload };
};

export const postFlightSuccess = (payload) => {
  return { type: POST_FLIGHT_SUCCESS };
};

export const flightRequest = () => {
  return { type: FLIGHT_REQUEST };
};

export const flightFailure = () => {
  return { type: FLIGHT_FAILURE };
};

//
export const fetch_flights_product = (payload) => {
  return { type: FETCH_FLIGHTS, payload };
};
//
export const handleDeleteProduct = (payload) => {
  return { type: DELETE_FLIGHTS, payload };
};

export const addFlight = (payload) => (dispatch) => {
  dispatch(flightRequest());

  axios
    .post("http://localhost:8000/flight", payload)
    .then(() => {
      dispatch(postFlightSuccess());
    })
    .catch((err) => {
      dispatch(flightFailure());
    });
};

//
export const fetchFlightProducts = (limit) => (dispatch) => {
  dispatch(flightRequest());
  axios
    .get(`http://localhost:8000/flight?_limit=${limit}`)
    .then((res) => {
      dispatch(fetch_flights_product(res.data));
    })
    .catch((err) => {
      dispatch(flightFailure());
    });
};

export const DeleteFlightProducts = (deleteId) => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:8000/flight/${deleteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    dispatch(handleDeleteProduct(deleteId));
  } catch (e) {
    console.log(e);
  }
};

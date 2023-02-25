import axios from "axios"
import { FLIGHT_FAILURE, FLIGHT_REQUEST, GET_FLIGHT_SUCCESS, POST_FLIGHT_SUCCESS } from "./actionType"


export const getFlightSuccess = (payload) => {
    return {type: GET_FLIGHT_SUCCESS, payload}
}

export const postFlightSuccess = (payload) => {
    return {type: POST_FLIGHT_SUCCESS}
}

export const flightRequest = () => {
    return {type: FLIGHT_REQUEST}
}

export const flightFailure = () => {
    return {type: FLIGHT_FAILURE}
}

export const addFlight = (payload) => (dispatch) => {
    dispatch(flightRequest())

    axios.post('http://localhost:8000/flight', payload).then(()=> {
        dispatch(postFlightSuccess())
    }).catch((err) => {
        dispatch(flightFailure())
    });

};

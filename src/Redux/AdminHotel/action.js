import axios from "axios"
import { HOTEL_FAILURE, HOTEL_REQUEST, GET_HOTEL_SUCCESS, POST_HOTEL_SUCCESS } from "./actionType"


export const getHotelSuccess = (payload) => {
    return {type: GET_HOTEL_SUCCESS, payload}
}

export const postHotelSuccess = (payload) => {
    return {type: POST_HOTEL_SUCCESS}
}

export const hotelRequest = () => {
    return {type: HOTEL_REQUEST}
}

export const hotelFailure = () => {
    return {type: HOTEL_FAILURE}
}

export const addHotel = (payload) => (dispatch) => {
    dispatch(hotelRequest())

    axios.post('http://localhost:8000/hotel', payload).then(()=> {
        dispatch(postHotelSuccess())
    }).catch((err) => {
        dispatch(hotelFailure())
    });

};

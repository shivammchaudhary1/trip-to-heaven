import axios from "axios"
import { GET_OFFER_ERROR, GET_OFFER_REQUEST, GET_OFFER_SUCCESS } from "./offer.actiointyp"

export const get_offer_request = () => {
    return {type: GET_OFFER_REQUEST}
}

export const get_offer_success = (payload) => {
    return {type: GET_OFFER_SUCCESS, payload}
}

export const get_offer_error = () => {
    return {type: GET_OFFER_ERROR}
}

// 

export const getOffers = (limit) => (dispatch) => {
    dispatch(get_offer_request())
    axios.get(`http://localhost:8000/giftcards?_limit=${limit}`)
    .then((res) => {
        // console.log(res.data)
        dispatch(get_offer_success(res.data))
    })
    .catch((err) => {
        dispatch(get_offer_error())
    })
}
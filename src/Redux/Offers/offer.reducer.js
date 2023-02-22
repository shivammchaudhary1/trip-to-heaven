import { GET_OFFER_ERROR, GET_OFFER_REQUEST, GET_OFFER_SUCCESS } from "./offer.actiointyp"

let initialState = {
    offers: [],
    isLoading: false,
    isError: false,
}

export const OfferReducer = (state = initialState, {type, payload}) => {
    switch(type){

        case GET_OFFER_REQUEST : return {...state, isLoading: state.isLoading = true}
        case GET_OFFER_SUCCESS : return {...state, isLoading: state.isLoading = false, offers: payload}
        case GET_OFFER_ERROR : return {...state, isLoading: state.isLoading = false, isError: state.isError = true}


        default : return state
    }
}
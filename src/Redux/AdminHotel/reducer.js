import { HOTEL_FAILURE, HOTEL_REQUEST, GET_HOTEL_SUCCESS, POST_HOTEL_SUCCESS } from "./actionType"

const initialState = {
    data: [],
    isLoading: false,
    isError: false,
}

export const HotelReducer = (state= initialState, {type, payload}) =>{

    switch (type){
        case HOTEL_REQUEST:
        return {...state, isLoading: true}
    
        case HOTEL_FAILURE:
        return {...state, isError: true}
    
        case GET_HOTEL_SUCCESS:
        return {...state, isLoading: false, flight:payload}
    
        case POST_HOTEL_SUCCESS:
        return {...state, isLoading: false, flight: payload}
    
          default:
            return state
      }
}
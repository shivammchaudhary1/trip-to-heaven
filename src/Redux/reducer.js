import { FLIGHT_FAILURE, FLIGHT_REQUEST, GET_FLIGHT_SUCCESS, POST_FLIGHT_SUCCESS } from "./actionType"

const initialState = {
    data: [],
    isLoading: false,
    isError: false,
}

export const Reducer = (state= initialState, {type, payload}) =>{

    switch (type){
        case FLIGHT_REQUEST:
        return {...state, isLoading: true}
    
        case FLIGHT_FAILURE:
        return {...state, isError: true}
    
        case GET_FLIGHT_SUCCESS:
        return {...state, isLoading: false, flight:payload}
    
        case POST_FLIGHT_SUCCESS:
        return {...state, isLoading: false, flight: payload}
    
          default:
            return state
      }
}
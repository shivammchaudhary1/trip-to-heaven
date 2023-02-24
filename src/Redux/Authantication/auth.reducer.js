import { GET_USERS, LOGIN_REQUEST, LOGIN_SUCCESSFUL, LOGOUT_USER, REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESSFUL } from "./auth.actionType"


const initialState = {
    activeUser: JSON.parse(localStorage.getItem('MkuserData')) || {},
    isAuth: JSON.parse(localStorage.getItem('MkisAuth')) || false,
    isError: false,
    isLoading: false,
    user: []
}

export const LoginReducer = (state = initialState, {type, payload}) => {

    switch(type){
        case LOGIN_REQUEST : return {...state, isLoading: state.isLoading = true}
        case LOGIN_SUCCESSFUL : return {...state, isAuth : state.isAuth = true ,isLoading: state.isLoading = false, activeUser: state.activeUser= payload}
        case LOGIN_REQUEST : return {...state, isLoading: state.isLoading = false, isError: state.isError = true}
        
        case REGISTER_REQUEST : return {...state, isLoading: state.isLoading = true}
        case REGISTER_SUCCESSFUL : return {...state, isActive : state.isActive = true , isLoading: state.isLoading = false, activeUser: state.activeUser= payload}
        case REGISTER_ERROR : return {...state, isLoading: state.isLoading = false, isError: state.isError = true}

        case GET_USERS : return {...state, isLoading: state.isLoading = false, isError: state.isError= false, user: state.user = payload}

        case LOGOUT_USER : return {...state, isLoading: state.isLoading = false, isError: state.isError= false, activeUser: state.activeUser = {}, isAuth: state.isActive = false}

        default: return state
    }
}
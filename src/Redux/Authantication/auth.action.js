import axios from "axios";
import {
  GET_USERS,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESSFUL,
  LOGOUT_USER,
  REGISTER_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESSFUL,
} from "./auth.actionType";

export const login_request = () => {
  return { type: LOGIN_REQUEST };
};

export const login_success = (payload) => {
  return { type: LOGIN_SUCCESSFUL, payload };
};
export const login_error = () => {
  return { type: LOGIN_ERROR };
};

export const register_request = () => {
  return { type: REGISTER_REQUEST };
};

export const register_success = (payload) => {
  return { type: REGISTER_SUCCESSFUL, payload };
};
export const register_error = () => {
  return { type: REGISTER_ERROR };
};

export const get_users = (payload) => {
  return { type: GET_USERS, payload };
};

export const handlelogout_user = () => {
  return { type: LOGOUT_USER };
};

export const userRigister = (userData) => async (dispatch) => {
  dispatch(register_request());
  let res = await axios
    .post(`https://makemytrip-api-data.onrender.com/users`, userData)
    .then((res) => {
      dispatch(register_success(res.data));
      // console.log(res.data)
    })
    .catch((err) => {
      dispatch(register_error());
    });
};

// get users

export const fetch_users = (dispatch) => {
  dispatch(register_request());
  axios
    .get(`https://makemytrip-api-data.onrender.com/users`)
    .then((res) => {
      dispatch(get_users(res.data));
    })
    .catch((err) => {
      dispatch(register_error());
    });
};

// Logint funcnality

export const login_user = (loginData) => (dispatch) => {
  dispatch(login_success(loginData));
  localStorage.setItem("MkuserData", JSON.stringify(loginData));
  localStorage.setItem("MkisAuth", JSON.stringify(true));
};

export const logout_user = (dispatch) => {
  dispatch(handlelogout_user());
  localStorage.setItem("MkuserData", JSON.stringify({}));
  localStorage.setItem("MkisAuth", JSON.stringify(false));
};

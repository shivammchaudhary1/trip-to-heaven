import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../../config/envs.js";

// Initialize state from localStorage
const getInitialState = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const user = localStorage.getItem("user");

  return {
    isAuthenticated: !!token,
    user: user ? JSON.parse(user) : null,
    token: token || null,
    role: role || null,
  };
};

const initialState = getInitialState();

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${config.development.API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${config.development.API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user || action.payload;
        state.token = action.payload.token;
        state.role = action.payload.role;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("role", action.payload.role);
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user || action.payload),
        );
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user || action.payload;
        state.token = action.payload.token;
        state.role = action.payload.role;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("role", action.payload.role);
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user || action.payload),
        );
      });
  },
});

export const { logout } = authSlice.actions;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectUserRole = (state) => state.auth.role;
export default authSlice.reducer;

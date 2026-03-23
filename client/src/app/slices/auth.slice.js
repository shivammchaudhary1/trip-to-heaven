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

  //   {
  //     "message": "User registered successfully",
  //     "success": true,
  //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWMxOTYwMDUwYjk0N2E5NDM4ZTMyMGQiLCJyb2xlIjpbInVzZXIiXSwiaWF0IjoxNzc0Mjk0NTI4LCJleHAiOjE3NzY4ODY1Mjh9.i_qismXr78AtMeymkbjTDcHykrU2Jq19QRzXC_U0UMw",
  //     "user": {
  //         "name": "sss ssss",
  //         "email": "s@gmail.com",
  //         "password": "$2b$10$VIyFRE9Mdl7iZ2sjkAIEguUZbCnSRvZK4JvxuyC4qQwHsK/AKj8Ga",
  //         "role": [
  //             "user"
  //         ],
  //         "isMarried": false,
  //         "gender": "male",
  //         "isActive": true,
  //         "preferences": {
  //             "newsletter": true,
  //             "notifications": true
  //         },
  //         "_id": "69c1960050b947a9438e320d",
  //         "createdAt": "2026-03-23T19:35:28.245Z",
  //         "updatedAt": "2026-03-23T19:35:28.245Z"
  //     }
  // }
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("check", action.payload);
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user.role;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("role", action.payload.user.role);
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user || action.payload),
        );
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user.role;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("role", action.payload.user.role);
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

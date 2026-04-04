import { configureStore } from "@reduxjs/toolkit";
import notifyReducer from "./slices/notify.slice";
import authReducer from "./slices/auth.slice";

export const store = configureStore({
  reducer: {
    notify: notifyReducer,
    auth: authReducer,
  },
});

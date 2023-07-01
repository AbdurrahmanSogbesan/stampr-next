import { configureStore } from "@reduxjs/toolkit";
import userReducer from "src/redux/slices/user";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;

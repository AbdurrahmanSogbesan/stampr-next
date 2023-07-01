import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

const initialState = {
  user: null,
  canUpload: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setCanUpload: (state, action) => {
      state.canUpload = action.payload;
    },
  },
});

export const { login, logout, setCanUpload } = userSlice.actions;

export const authUser = (state: { user: { user: User } }) => {
  console.log(state);
  return state.user.user;
};
export const isAuthenticated = (state: { user: { user: User } }) =>
  !!state.user?.user?.uid;

export default userSlice.reducer;

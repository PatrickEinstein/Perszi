import { createSlice } from "@reduxjs/toolkit";

export const Role = createSlice({
  name: "role",
  initialState: {
    loggedInUser: ["X", "X", "X", "X"],
    userInfo: {},
  },
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setLoggedInUser,setUserInfo } = Role.actions;

export default Role.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const Role = createSlice({
  name: "role",
  initialState: {
    loggedInUser: ["X", "X", "X", "X"],
  },
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
});

export const { setLoggedInUser } = Role.actions;

export default Role.reducer;

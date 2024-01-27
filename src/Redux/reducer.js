import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",
  initialState: {
    loggedInUser: ["X", "X", "X", "X"],
    typeofProfilePage: "Administrator",
    openModal: false,
    openModal2: false,
    selectedCollection: {},
    product: {},
    openLoader: false,
    user: {},
  },
  reducers: {
    selectedProductId: (state, action) => {
      state.product = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.user = action.payload;
    },
    setSelectedCollection: (state, action) => {
      state.selectedCollection = action.payload;
    },
    toggleopenModal: (state, action) => {
      state.openModal = !state.openModal;
    },
    toggleopenModal2: (state, action) => {
      state.openModal2 = !state.openModal2;
    },
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    setProfileIndex: (state, action) => {
      state.typeofProfilePage = action.payload;
    },
    setOpenLoader: (state, action) => {
      state.openLoader = !state.openLoader;
    },
  },
});

export const {
  setSelectedUser,
  setOpenLoader,
  selectedProductId,
  toggleopenModal2,
  setSignedUpUser,
  setLoggedInUser,
  setProfileIndex,
  toggleopenModal,
  setSelectedCollection,
} = auth.actions;

export default auth.reducer;

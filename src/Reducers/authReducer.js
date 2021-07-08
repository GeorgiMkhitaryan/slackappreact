import { createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    verified: false,
  },
  reducers: {
    hasLodined: (state, payload) => {
      state.verified = payload.payload;
    },
    logOut: (state) => {
      localStorage.removeItem("token");
      state.verified = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { hasLodined, logOut } = authReducer.actions;

export default authReducer.reducer;

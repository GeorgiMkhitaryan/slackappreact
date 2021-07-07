import { createSlice } from "@reduxjs/toolkit";

export const rootReducer = createSlice({
  name: "registerLogin",
  initialState: {
    subDomain: null,
    verified: false,
    emailRegistred: true,
    activateCode: false,
    errorMsg: null,
  },
  reducers: {
    setSubDomain: (state, action) => {
      state.subDomain = action.payload;
    },
    emailRegistration: (state) => {
      state.emailRegistred = false;
      state.activateCode = true;
    },

    emailVerified: (state) => {
      state.activateCode = false;
      state.verified = true;
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
    },
    dellErrorMsg: (state) => {
      state.errorMsg = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSubDomain,
  emailRegistration,
  emailVerified,
  setErrorMsg,
  dellErrorMsg,
} = rootReducer.actions;

export default rootReducer.reducer;

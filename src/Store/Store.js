import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import rootReducer from "../Reducers/rootReducer";
import authReducer from "../Reducers/authReducer";
import thunk from "redux-thunk";

export default configureStore(
  {
    reducer: {
      rootReducer,
      authReducer,
    },
  },
  applyMiddleware(thunk)
);

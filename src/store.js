import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const middleware = [thunk];
const initialState = {};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

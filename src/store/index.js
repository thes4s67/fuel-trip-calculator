import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import mapDataReducer from "../store/slices/mapDataSlice";
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


// middleware
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export const store = configureStore({
  reducer: {
    mapData: mapDataReducer,
  },
}, composedEnhancer);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

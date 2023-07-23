import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../auth/authSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: { auth: authReducer, products: productSlice, cartItems: cartSlice},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../auth/authSlice";

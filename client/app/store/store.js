import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../auth/authSlice";
import productSlice from "./productSlice";
import orderSlice from "./orderSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productSlice,
    orders: orderSlice,
    cart : cartSlice,
    orderProducts: cartSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../auth/authSlice";

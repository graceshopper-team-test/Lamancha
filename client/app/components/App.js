import React, { useEffect } from "react";
import {  useDispatch } from "react-redux";
import { fetchAllProducts } from "../store/productSlice";
import { Navbar, AppRoutes, ProductsList, Product, Cart } from "./";
import {Routes, Route} from "react-router-dom";
const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the async thunk when the component mounts
    dispatch(fetchAllProducts());
  }, []);
  return (
    <div>
      <Navbar />
      <AppRoutes />
      {/* <ProductsList /> */}
    </div>
  );
};

export default App;

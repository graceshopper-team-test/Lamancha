import React, { useEffect } from "react";
import {  useDispatch } from "react-redux";
import { fetchAllProducts } from "../store/productSlice";
import { Navbar, AppRoutes} from "./";

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
    </div>
  );
};

export default App;

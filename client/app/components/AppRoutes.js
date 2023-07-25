import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../auth/AuthForm";
import Home from "./Home";
import { me } from "../store/store";
import { Cart, Product, ProductsList } from "./";

// import {ProductsList} from './index'

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div className="login">
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/:id" element={<Product />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/:id" element={<Product />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;

import React from "react";
import { Navbar, AppRoutes, ProductsList, Product } from "./";
import { Route, Routes } from "react-router-dom"

const App = () => {
  return (
    <div>
      <Navbar />
      HELLO!
      <AppRoutes />
      <ProductsList />
      <Routes>
        <Route path="/products/:id" element={<Product />} />
      </Routes>
    </div>
  );
};

export default App;

import React from "react";

import Navbar from './components/Navbar'
import Routes from './Routes'
import ProductsList from './components/productsList'

const App = () => {
  return (
    <div>
      <Navbar />
      HELLO!
      <Routes />
      <ProductsList />
    </div>
  );
};

export default App;

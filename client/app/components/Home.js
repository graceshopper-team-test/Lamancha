import React from 'react';
import { useSelector } from 'react-redux';
import {ProductsList } from "./";

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <ProductsList />
    </div>
  );
};

export default Home;

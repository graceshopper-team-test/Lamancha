import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, decrement ,checkout} from "../store/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  // console.log(cartItems);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecrement = (product) => {
    dispatch(decrement(product));
  };

  const handlCheckout = () => {
    dispatch(checkout());
  };

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your shopping cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>{item.imageUrl}</p>
                <p>
                  Quantity: {item.quantity} &nbsp;
                  <button onClick={() => handleAddToCart(item)}>+</button>&nbsp;
                  <button onClick={() => handleDecrement(item)}>-</button>
                </p>
              </li>
            ))}
          </ul>
          <p>
            Total Price: $
            {cartItems
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </p>
          <button onClick={handlCheckout}>Check Out</button>
        </>
      )}
    </div>
  );
};

export default Cart;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCartItems = getCartItems();
    if (storedCartItems.length > 0) {
      dispatch(addToCart(storedCartItems));
    }
  }, [dispatch]);


  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;

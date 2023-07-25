import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, decrement, checkout } from "../store/cartSlice";
import "./Cart.css";

const Cart = () => {
  const [orderCompleted, setOrderCompleted] = useState(false);

  const cartItems = useSelector((state) => state.cart);
  // console.log(cartItems);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecrement = (product) => {
    dispatch(decrement(product));
  };

  const handleCheckout = () => {
    setTimeout(() => {
      setOrderCompleted(true);
      dispatch(checkout());
    }, 2000);
  };

  return (
    <div>
      <h1 className="h1Cart">Cart</h1>
      {orderCompleted ? (
        <h2 className="h2Cart">
          Your order is completed, thanks for shopping!
        </h2>
      ) : cartItems.length === 0 ? (
        <h2 className="h2Cart">Your shopping cart is empty</h2>
      ) : (
        <div className="cart">
          <ul className="cartList">
            {cartItems.map((item) => (
              <li className="cartCard" key={item.id}>
                <div className="cartItem">
                  <h3 className="itemName">{item.name}</h3>
                  <img className="imageCart" src={item.imageUrl} />
                </div>

                <div className="cartDesc">
                  <p className="price">Price: ${item.price}</p>
                  <p className="quantity">
                    Quantity: {item.quantity} &nbsp;
                    <button
                      className="buttonCart2"
                      onClick={() => handleAddToCart(item)}
                    >
                      +
                    </button>
                    &nbsp;
                    <button
                      className="buttonCart2"
                      onClick={() => handleDecrement(item)}
                    >
                      -
                    </button>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="purchase">
            <div className="totalPrice">
              Total Price: $
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </div>
            <button className="buttonCart" onClick={handleCheckout}>
              Check Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateCartItem, fetchAllOrderProducts } from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const orderProducts = useSelector(
    (state) => state.orderProducts.allOrderProducts
  );

  useEffect(() => {
    dispatch(fetchAllOrderProducts()); //want to get order where userId is current user's id
  }, []);

  const handleIncrement = async (productId) => {
    const order = orderProducts.find((order) => order.product.id === productId);
    if (order && order.quantity > 0) {
      dispatch(updateCartItem({
        id: order.product.id,
        quantity: order.quantity + 1
        }));
    }
  };

  const handleDecrement = async (productId) => {
    const order = orderProducts.find((order) => order.product.id === productId);
    if (order && order.quantity > 0) {
      dispatch(updateCartItem({
        id: order.product.id,
        quantity: order.quantity - 1
        }));
    }
  };

  return (
    <section id="all-Products">
      <h1>Cart Component</h1>
      <div id="userCart">
        {orderProducts.map((order) => (
          <div className="cartItem" key={order.product.id}>
            <h3>{`${order.product.name}`}</h3>
            <img src={`${order.product.imageUrl}`} />
            <p>{`${order.product.details}`}</p>
            <h4>Unit Price: {`${order.product.price}`}</h4>
            <h4>
              Total Price:{" "}
              {`${Number(order.product.price) * Number(order.quantity)}`}
            </h4>
            {console.log(Number(order.quantity))}
            <p>
              &nbsp; Quantity: {order.quantity}&nbsp;
              <button onClick={() => handleIncrement(order.product.id)}>
                +
              </button>
              &nbsp;
              <button onClick={() => handleDecrement(order.product.id)}>
                -
              </button>
              &nbsp;
            </p>
            <button>Place Order</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cart;

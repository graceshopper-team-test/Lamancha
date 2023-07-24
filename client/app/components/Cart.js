import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateCartItem ,fetchAllOrderProducts} from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const orderProducts = useSelector((state)=>state.orderProducts.allOrderProducts);
    console.log(orderProducts);
  useEffect(() => {
    dispatch(fetchAllOrderProducts()); //want to get order where userId is current users's id
  }, []);

  const handleIncrement = async () => {
    dispatch(
        updateCartItem({
        id: product.id,
        updateProduct: { quantity: product.quantity + 1 },
      })
    );
  };

  const handleDecrement = async () => {
    dispatch(
        updateCartItem({
        id: product.id,
        updateProduct: { quantity: product.quantity - 1 },
      })
    );
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
            <h4>Total Price: {`${Number(order.product.price) * Number(order.quantity)}`}</h4>
            {console.log(Number(order.quantity))}
            <p>
              &nbsp; Quantity: {order.quantity}&nbsp;
              <button onClick={handleIncrement}>+</button>&nbsp;
              <button onClick={handleDecrement}>-</button>&nbsp;
            </p>
            <button>Place Order</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cart;

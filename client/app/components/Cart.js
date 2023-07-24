import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { cartProducts, deleteProduct, getOrder, updateCartItem } from '../store/cartSlice';

const Cart = () => { 
    const dispatch = useDispatch();
    const userOrder = useSelector(cartProducts)
    // const { id } = useParams();
    // console.log("itemID =>",itemId)
    
    useEffect(() => {
        dispatch(getOrder()) //want to get order where userId is current users's id
  },[dispatch])
    console.log('userOrder => ', userOrder)
    return (
    <section id='all-Products'>
        <h1>Cart Component</h1>
        <div id='userCart'>
            {userOrder.map((order) => (
                <div className='cartItem' key={order.product.id}>
                    {/* <h1>{`User Id: ${order.userId}`}</h1>
                    <h1>{`Order Id: ${order.id}`}</h1> */}
                    <h1>{`${order.product.name}`}</h1>
                    <img src={`${order.product.imageUrl}`} />
                    <h4>{`${order.product.price}`}</h4>
                    {/* {update item quantity below} 
                    () => dispatch(updateCartItem({id:order.product.id, quantity: order.quantity -1}))
                    <button onClick={() => dispatch(updateCartItem({id:order.id, quantity: order.quantity +1}))}>+</button>*/}
                    <button>-</button><p>{order.quantity}</p><button>+</button>
                    <button onClick={() => dispatch(deleteProduct(order.product.id))}>Remove</button>
                    {/* <input type='number' name='quantity' min={"0"} max={"order.stock?"} onChange={'do we need onchange to set the quantity and multiply it by price?'}/> */}
                    <hr />
                </div>
            ))}
        </div>
            <button>Place Order</button> 
    </section>
)};

export default Cart;
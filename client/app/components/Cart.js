import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { cartProducts, deleteProduct, getOrder } from '../store/cartSlice';

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
                <div className='cartItem' key={order.id}>
                    <h1>{`User Id: ${order.userId}`}</h1>
                    <h1>{`Order Id: ${order.id}`}</h1>
                    <h1>{`${order.completed}`}</h1>
                    <h1>{`${order.user.username}`}</h1>
                    <button onClick={() => dispatch(deleteProduct(order.id))}>Remove</button>
                    
                     <p>{`${order.name}`}</p>
                    <img src={`${order.imageUrl}`} />
                    <p>{`${order.details}`}</p>
                    <h4>{`${order.price}`}</h4>
                    <button>-</button><p>{'order.quantity'}</p><button>+</button>
                    {/* <input type='number' name='quantity' min={"0"} max={"order.stock?"} onChange={'do we need onchange to set the quantity and multiply it by price?'}/> */}
                    <button>Place Order</button> 
                    <hr />
                </div>
            ))}
        </div>
    </section>
)};

export default Cart;
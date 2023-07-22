import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { cartProducts } from '../store/cartSlicetSlice';
import { getOrder } from '../store/cartSlice';

const Cart = () => { 
    const dispatch = useDispatch();
    const userOrder = useSelector(cartProducts)
    const { id } = useParams();
    // console.log("itemID =>",itemId)
    
    useEffect(() => {
        dispatch(getOrder(id)) //want to get order where userId is current users's id
  },[dispatch])
    console.log('product => ', product)
    return (
    <section id='all-Products'>
        <h1>Cart Component</h1>
        <div id='userCart'>
            {userOrder.map((order) => (
                <div className='cartItem' key={order.id}>
                    <h3>{`${order.name}`}</h3>
                    <img src={`${order.imageUrl}`} />
                    <p>{`${order.details}`}</p>
                    <h4>{`${order.price}`}</h4>
                    {/* <input type='number' name='quantity' min={"0"} max={"order.stock?"} onChange={'do we need onchange to set the quantity and multiply it by price?'}/> */}
                    <button>Place Order</button>
                </div>
            ))}
        </div>
    </section>
)};

export default Cart;
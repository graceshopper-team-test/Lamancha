import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleProduct, singleProduct} from '../store/singleProductSlice';
import { getOrder } from '../store/cartSlice';

const Cart = () => { 
    const dispatch = useDispatch();
    const userOrder = useSelector(orderProducts)
    const { userId } = useParams();
    // console.log("itemID =>",itemId)
    
    useEffect(() => {
        dispatch(getOrder(userId)) //want to get order where userId is current users's id
  },[dispatch])
    console.log('product => ', product)
    return (
    <section id='all-Products'>
        <div id='userCart'>
            <h1>Cart Component</h1>
            {userOrder.map((order) => (
                <div className='cartItem' key={order.id}>
                    <h3>{`${order.name}`}</h3>
                    <img src={`${order.imageUrl}`} />
                    <p>{`${or.details}`}</p>
                    <h4>{`${product.price}`}</h4>
                </div>
            ))}
        </div>
    </section>
)};

export default Cart;
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../store/productSlice";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const products = useSelector((state) => state.products.allProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])
  // console.log(products);

  // useEffect(() => {
  //   // Dispatch the async thunk when the component mounts
  //   dispatch(fetchAllProducts());
  // }, []);
  // const cartItemAmount=cartItems[id]
  return (
    <div>
      <h2>Products List</h2>
      {products.length === 0 ? (
        <p>Loading...</p>
      ) : products.error ? (
        <p>Error: {products.error}</p>
      ) : (
        <ul>
          {products.map((product) => {
            return (
              <li key={product.id}>
                <Link to={`/products/${product.id}`}>
                <h3>{product.name}</h3>
                </Link>
                <p>Price: ${product.price}</p>
                <p>{product.imageUrl}</p>
                <p>Description: {product.details}</p>
                <p>Stock: {product.stock}</p>
                {/* <button onClick={()=>addToCart(id)}>Add To Cart {cartItemAmount >0 && <>({cartItemAmount})</>}</button> */}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ProductsList;

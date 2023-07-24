import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../store/productSlice";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import "./ProductList.css";
=======
import { addToCart } from "../store/cartSlice";
>>>>>>> aa3ffeb6786beff59079e71745fffdbd55dede74

const ProductsList = () => {
  const products = useSelector((state) => state.products.allProducts);
  const dispatch = useDispatch();

<<<<<<< HEAD
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  // console.log(products);
=======
  // function to add a product to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
>>>>>>> aa3ffeb6786beff59079e71745fffdbd55dede74

  // Dispatch the async thunk when the component mounts
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  // const cartItemAmount=cartItems[id]
  return (
    <div className="productList">
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
                <button onClick={() => handleAddToCart(product)}>
                  Add To Cart
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ProductsList;

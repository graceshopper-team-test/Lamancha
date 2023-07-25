import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../store/productSlice";
import { Link } from "react-router-dom";
import "./ProductList.css";
import { addToCart } from "../store/cartSlice";

const ProductsList = () => {
  const products = useSelector((state) => state.products.allProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  // console.log(products);
  // function to add a product to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // Dispatch the async thunk when the component mounts
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  // const cartItemAmount=cartItems[id]
  return (
    <div className="productList">
      <h2>Products List</h2>
      {products.length === 0 ? (
        <p className="infoMessage">Loading...</p>
      ) : products.error ? (
        <p className="infoMessage">Error: {products.error}</p>
      ) : (
        <div className="productUL">
          {products.map((product) => {
            return (
              <div className="li" key={product.id}>
                <Link className="productName" to={`/products/${product.id}`}>
                  <h3>{product.name}</h3>
                  <img className="image" src={product.imageUrl} />
                </Link>

                <p className="productInfo">Price: ${product.price}</p>
                <button
                  className="buttonList"
                  onClick={() => handleAddToCart(product)}
                >
                  Add To Cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductsList;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";
import "./Product.css";

const Product = () => {
  const product = useSelector((state) => state.products.singleProduct);
  // console.log(product);
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  useEffect(() => {
    // Dispatch the async thunk when the component mounts
    dispatch(fetchSingleProduct(id));
  }, [id]);

  return (
    <div className="singleProduct">
      {product ? (
        <div className="cardStyle">
          <div className="product">
            <div>
              <img className="image" src={product.imageUrl} />
            </div>
            <div className="productDetails">
              <h3>{product.name}</h3>
              <p>Description: {product.details}</p>
              <p>Price: ${product.price}</p>
              <button
                className="buttonAdd"
                onClick={() => handleAddToCart(product)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading product data...</p>
      )}
    </div>
  );
};

export default Product;

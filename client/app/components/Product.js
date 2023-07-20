import React from "react";
import { useSelector } from "react-redux";

const Product = () => {
  
  const product = useSelector((state) => state.products.singleProduct);

  return (
    <div>
      {product ? (
        <div>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>{product.imageUrl}</p>
          <p>Description: {product.details}</p>
          <p>Stock: {product.stock}</p>
        </div>
      ) : (
        <p>Loading product data...</p>
      )}
    </div>
  );
};

export default Product;

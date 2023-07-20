import React from "react";
import { useSelector} from "react-redux";

const ProductsList = () => {
  const products = useSelector((state) => state.products.allProducts);
  return (
    <div>
      <h2>Products List</h2>
      {products.loading ? (
        <p>Loading...</p>
      ) : products.error ? (
        <p>Error: {products.error}</p>
      ) : (
        <ul>
          {products.map((product) => {
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>{product.imageUrl}</p>
              <p>Description: {product.details}</p>
              <p>Stock: {product.stock}</p>
            </li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default ProductsList;

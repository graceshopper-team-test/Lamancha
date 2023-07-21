import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { fetchAllProducts } from "../store/productSlice"
import { Link } from "react-router-dom"

const ProductsList = () => {
  const products = useSelector((state) => state.products.allProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])
  // console.log(products);
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
            return(
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>
                <h3>{product.name}</h3>
              </Link>
              <p>Price: ${product.price}</p>
              <p>{product.imageUrl}</p>
              <p>Description: {product.details}</p>
              <p>Stock: {product.stock}</p>
            </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ProductsList;

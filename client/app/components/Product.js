import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleProduct } from "../store/productSlice";
import { useParams } from "react-router";


const Product = () => {
  const product = useSelector((state) => state.products.singleProduct);
  const dispatch = useDispatch();
  const {productID} = useParams()
console.log(product);
  useEffect(() => {
    dispatch(fetchSingleProduct(productID))
  }, [dispatch])

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

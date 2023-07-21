import React,{useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../store/productSlice";

const Product = () => {
  
  const product = useSelector((state) => state.products.singleProduct);
// console.log(product);
const {id}=useParams();
const dispatch = useDispatch();

useEffect(() => {
  // Dispatch the async thunk when the component mounts
  dispatch(fetchSingleProduct(id));
}, [id]);

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

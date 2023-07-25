import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../store/cartSlice";
import { Link } from "react-router-dom";
import { deleteSingleProduct, fetchAllProducts } from "../store/productSlice";
import AddProductForm from "./AddProductForm";
import "./Admin.css";

const Admin = () => {
  const products = useSelector((state) => state.products.allProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div>
      <h1 className="headerAdmin">HELLO FROM ADMIN DASHBOARD</h1>
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
                  <p className="productInfo">Description: {product.details}</p>
                  <p className="productInfo">Stock: {product.stock}</p>
                  {/* <button
                    className="button"
                    onClick={() => handleAddToCart(product)}
                    >
                    Add To Cart
                    </button> */}
                  <button
                    className="buttonAdminList"
                    onClick={() => dispatch(deleteSingleProduct(product.id))}
                  >
                    Delete
                  </button>
                  <form></form>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <AddProductForm />
    </div>
  );
};

export default Admin;

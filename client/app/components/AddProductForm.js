import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addSingleProduct } from "../store/productSlice";
import "./AddProductForm.css";

const AddProductForm = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [stock, setStock] = useState("");
  const dispatch = useDispatch();

  const handleProductNameChange = (e) => {
    setName(e.target.value);
  };

  const handleProductImgChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDetails(e.target.value);
  };

  const handleStockChange = (e) => {
    setStock(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { name, price, imageUrl, details, stock };
    dispatch(addSingleProduct(newProduct));

    // Clear the form fields after submission
    setName("");
    setImageUrl("");
    setPrice("");
    setDetails("");
    setStock("");
  };

  return (
    <div className="addProductDiv">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={name}
            onChange={handleProductNameChange}
            required
          />
          <label htmlFor="productImg">Product Image:</label>
          <input
            type="text"
            id="productImg"
            value={imageUrl}
            onChange={handleProductImgChange}
            required
          />
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={handlePriceChange}
            required
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={details}
            onChange={handleDescriptionChange}
            required
          />
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={handleStockChange}
            required
          />
          <button className="buttonAddProduct" type="submit">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;

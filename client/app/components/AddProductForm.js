import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSingleProduct } from '../store/productSlice';

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productImg, setProductImg] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const dispatch = useDispatch();


  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductImgChange = (e) => {
    setProductImg(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStockChange = (e) => {
    setStock(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {productName, productImg, price,description,stock}
    dispatch(addSingleProduct(newProduct))

    // Clear the form fields after submission
    setProductName('');
    setProductImg('');
    setPrice('');
    setDescription('');
    setStock('');
  };

  

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={handleProductNameChange}
            required
          />
          <label htmlFor="productImg">Product Image:</label>
          <input
            type="text"
            id="productImg"
            value={productImg}
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
            value={description}
            onChange={handleDescriptionChange}
            required
          />
          <label htmlFor="stock">Stock:</label>
          <input 
          type='number'
            id="stock"
            value={stock}
            onChange={handleStockChange}
            required
          />
        <button type="submit">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
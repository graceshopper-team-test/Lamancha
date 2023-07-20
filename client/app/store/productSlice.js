import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch all tasks
export const fetchAllProducts = createAsyncThunk(
  "allProducts/fetchAllProducts",
  async () => {
    try {
      const { data } = await axios.get("/api/products");
      // console.log(data, "data");
      return data;
    } catch (err) {
      return err.message;
    }
  }
);
// fetch single product
export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/fetchSingleProduct",

  async (id) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);
// post new product
export const addSingleProduct = createAsyncThunk(
  "singleProduct/addSingleProduct",

  async (newProduct) => {
    try {
      // console.log(newProduct);
      const { data } = await axios.post(`/api/products/`, newProduct);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);
// delete single product
export const deleteSingleProduct = createAsyncThunk(
  "singleProduct/deleteSingleProduct",

  async (productId) => {
    try {
      const { data } = await axios.delete(`/api/products/${productId}`);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);
// update product
export const updateSingleProduct = createAsyncThunk(
  "singleProduct/updateSingleProduct",

  async ({ id, updateProduct }) => {
    try {
      const { data } = await axios.put(`/api/products/${id}`, updateProduct);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);


export const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    singleProduct: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.fulfilled, (state, { payload }) => {
        // use the payload backend send back to set allproducts to the state
        state.allProducts = payload;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, { payload }) => {
        // use payload to set singleProduct to the state
        state.singleProduct = payload;
      })
      .addCase(addSingleProduct.fulfilled, (state, { payload }) => {
        // use payload to add singleProduct to the state.allProducts
        state.allProducts.push(payload);
      })
      .addCase(deleteSingleProduct.fulfilled, (state, { payload }) => {
        // use payload to delete the product from state.allProducts
        state.allProducts.splice(
          state.allProducts.findIndex((product) => product.id === payload.id),
          1
        );
      })
      .addCase(updateSingleProduct.fulfilled, (state, { payload }) => {
        // use payload to update single product and all products
        state.singleProduct = payload;
        state.allProducts = state.allProducts.map((product) => {
          if (product.id === payload.id) {
            return payload;
          }
          return product;
        });
      });
  },
});

export default productSlice.reducer;

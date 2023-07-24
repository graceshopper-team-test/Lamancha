import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch all orderproducts
export const fetchAllOrderProducts = createAsyncThunk(
  "allOrderProducts/fetchAllOrderProducts",
  async () => {
    try {
      const { data } = await axios.get("/api/orderproducts");
    //   console.log(data);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);
// add new item to cart
export const addToCart = createAsyncThunk(
  "singleOrderProduct/addToCart",

  async ({ newItem }) => {
    try {
        console.log(newItem);
      const { data } = await axios.post(`/api/orderproducts`, newItem);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

// update item in cart
export const updateCartItem = createAsyncThunk(
  "singleOrderProduct/updateSingleOrderProduct",
  async ({ updateItem, id }) => {
    try {
      const { data } = await axios.put(`/api/orderproducts/${id}`, updateItem);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const orderSlice = createSlice({
  name: "orderProducts",
  initialState: {
    allOrderProducts:[],
    orderProduct: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrderProducts.fulfilled, (state, { payload }) => {
        // use payload to fetch all orderProducts
        state.allOrderProducts = payload;
        // console.log(payload);
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        // use payload to add singleOrder to the state.allOrders
        state.orderProduct = payload;
      })
      .addCase(updateCartItem.fulfilled, (state, { payload }) => {
        //update cart item to the state
        state.orderProduct = payload;
      });
  },
});

export default orderSlice.reducer;

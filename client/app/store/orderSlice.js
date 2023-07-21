import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch all orders
export const fetchAllOrders = createAsyncThunk(
  "allOrders/fetchAllOrders",
  async () => {
    try {
      const { data } = await axios.get("/api/orders");
      // console.log(data, "data");
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

// fetch single Order
export const fetchSingleOrder = createAsyncThunk(
  "singleOrder/fetchSingleOrder",

  async (id) => {
    try {
      const { data } = await axios.get(`/api/orders/${id}`);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);
// post new Order
export const addSingleOrder = createAsyncThunk(
  "singleOrder/addSingleOrder",

  async (newOrder) => {
    try {
      // console.log(newOrder);
      const { data } = await axios.post(`/api/orders/`, newOrder);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);
// delete single Order
export const deleteSingleOrder = createAsyncThunk(
  "singleOrder/deleteSingleOrder",

  async (orderId) => {
    try {
      const { data } = await axios.delete(`/api/orders/${orderId}`);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);
// update Order
export const updateSingleOrder = createAsyncThunk(
  "singleOrder/updateSingleOrder",

  async ({ id, updateOrder }) => {
    try {
      const { data } = await axios.put(`/api/orders/${id}`, updateOrder);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    allOrders: [],
    singleOrder: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.fulfilled, (state, { payload }) => {
        // use the payload backend send back to set allOrders to the state
        state.allOrders = payload;
      })
      .addCase(fetchSingleOrder.fulfilled, (state, { payload }) => {
        // use payload to set singleOrder to the state
        state.singleOrder = payload;
      })
      .addCase(addSingleOrder.fulfilled, (state, { payload }) => {
        // use payload to add singleOrder to the state.allOrders
        state.allOrders.push(payload);
      })
      .addCase(deleteSingleOrder.fulfilled, (state, { payload }) => {
        // use payload to delete the Order from state.allOrders
        state.allOrders.splice(
          state.allOrders.findIndex((order) => order.id === payload.id),
          1
        );
      })
      .addCase(updateSingleOrder.fulfilled, (state, { payload }) => {
        // use payload to update single order and all orders
        state.singleOrder = payload;
        state.allOrders = state.allOrders.map((order) => {
          if (order.id === payload.id) {
            return payload;
          }
          return order;
        });
      });
  },
});

export default orderSlice.reducer;
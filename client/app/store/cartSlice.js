// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // fetch all orderproducts
// export const fetchAllOrderProducts = createAsyncThunk(
//   "allOrderProducts/fetchAllOrderProducts",
//   async () => {
//     try {
//       const { data } = await axios.get("/api/orderproducts");
//     //   console.log(data);
//       return data;
//     } catch (err) {
//       return err.message;
//     }
//   }
// );
// // add new item to cart
// export const addToCart = createAsyncThunk(
//   "singleOrderProduct/addToCart",

//   async ({ newItem }) => {
//     try {

//       const { data } = await axios.post(`/api/orderproducts`, newItem);
//       console.log("data:", data);
//       return data;
//     } catch (err) {
//       return err.message;
//     }
//   }
// );

// // update item in cart
// export const updateCartItem = createAsyncThunk(
//   "singleOrderProduct/updateSingleOrderProduct",
//   async ({ id,updateItem }) => {
//     try {
//       const { data } = await axios.put(`/api/orderproducts/${id}`, updateItem);
//       return data;
//     } catch (err) {
//       return err.message;
//     }
//   }
// );

// export const orderSlice = createSlice({
//   name: "orderProducts",
//   initialState: {
//     allOrderProducts:[],
//     orderProduct: {},
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllOrderProducts.fulfilled, (state, { payload }) => {
//         // use payload to fetch all orderProducts
//         state.allOrderProducts = payload;
//         // console.log(payload);
//       })
//       .addCase(addToCart.fulfilled, (state, { payload }) => {
//         // use payload to add singleOrder to the state.allOrders
//         state.orderProduct = payload;
//       })
//       .addCase(updateCartItem.fulfilled, (state, { payload }) => {
//         //update cart item to the state
//         state.orderProduct = payload;
//       });
//   },
// });

// export default orderSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const newItemWithQuantity = { ...newItem, quantity: 1 };
        state.push(newItemWithQuantity);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    decrement: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem && existingItem.quantity > 0) {
        existingItem.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    // reset the cart to empty after checkout
    checkout: (state, action) => {
      state.splice(0, state.length);
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(checkout.fulfilled, (state, { payload }) => {
  //       state.allOrderProducts = payload;
  //       // console.log(payload);
  //     })
  // }
});

export const { addToCart, decrement, checkout } = cartSlice.actions;

export default cartSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

// export const checkoutCart = createAsyncThunk(
//   "cart/updateCart",
//   async ({ cartItems }) => {
//     try {
//       const { data } = await axios.put(`/api/orderproducts`, cartItems);
//       return data;
//     } catch (err) {
//       return err.message;
//     }
//   }
// );

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
  //     .addCase(checkoutCart.fulfilled, (state, { payload }) => {
  //       state = payload;
  //     })
  // }
});

export const { addToCart, decrement, checkout } = cartSlice.actions;

export default cartSlice.reducer;

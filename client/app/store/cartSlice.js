import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const getOrder = createAsyncThunk("userOrder", async () => {
    try {
        const { data } = await axios.get('/api/orderproducts', /*{ header: { authorization: token }}*/);
        return data;
    } catch (error) {
        next(error)
    }
});

export const deleteProduct = createAsyncThunk("deleteProduct", async (id) => {
    try {
        const { data } = await axios.delete(`/api/ordersproduct/${id}`);
        return data;
    } catch(error) {
        next(error);
    }
})

// update item in cart
export const updateCartItem = createAsyncThunk("updateItem", async ({ id, quantity}) => {
      try {
        const { data } = await axios.put(`/api/orderproducts/${id}`, {quantity});
        return data;
      } catch (err) {
        return err.message;
      }
    }
  );

const cartSlice = createSlice({
    name: 'cartItems',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOrder.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(updateCartItem.fulfilled, (state, { payload }) => {
            //update cart item to the state
            return action.payload; //to update item in cart and then pull new list
            // state.orderProduct = payload;
          });
    }
});

export const cartProducts = (state) => {
    return state.cartItems;
};

export default cartSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const getOrder = createAsyncThunk("userOrder", async () => {
    try {
        const { data } = await axios.get('/api/orders', /*{ header: { authorization: token }}*/);
        return data;
    } catch (error) {
        next(error)
    }
});

export const deleteProduct = createAsyncThunk("deleteProduct", async (id) => {
    try {
        const { data } = await axios.delete(`/api/orders/${id}`);
        return data;
    } catch(error) {
        next(error);
    }
})

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
        })
    }
});

export const cartProducts = (state) => {
    return state.cartItems;
};

export default cartSlice.reducer;
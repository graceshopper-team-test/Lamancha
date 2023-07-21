//still in the works
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const getOrder = createAsyncThunk("userOrder", async (id) => {
    try {
        const { data } = await axios.get('/api/orders', id);
        return data;
    } catch (error) {
        next(error)
    }
});

const cartSlice = createSlice({
    name: 'cartItems',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            return action.payload;
        })
    }
});

export const cartProducts = (state) => {
    return state.cartItems;
};

export default cartSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all users
export const fetchAllUsers = createAsyncThunk(
  "allUsers/fetchAllUsers",
  async () => {
    try {
      const { data } = await axios.get("/api/users");
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

// Fetch single user
export const fetchSingleUser = createAsyncThunk(
  "singleUser/fetchSingleUser",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

// Create new user
export const addSingleUser = createAsyncThunk(
  "singleUser/addSingleUser",
  async (newUser) => {
    try {
      const { data } = await axios.post(`/api/users/`, newUser);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

// Delete single user
export const deleteSingleUser = createAsyncThunk(
  "singleUser/deleteSingleUser",
  async (userId) => {
    try {
      const { data } = await axios.delete(`/api/users/${userId}`);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

// Update user
export const updateSingleUser = createAsyncThunk(
  "singleUser/updateSingleUser",
  async ({ id, updatedUser }) => {
    try {
      const { data } = await axios.put(`/api/users/${id}`, updatedUser);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState: {
    allUsers: [],
    singleUser: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
        state.allUsers = payload;
      })
      .addCase(fetchSingleUser.fulfilled, (state, { payload }) => {
        state.singleUser = payload;
      })
      .addCase(addSingleUser.fulfilled, (state, { payload }) => {
        state.allUsers.push(payload);
      })
      .addCase(deleteSingleUser.fulfilled, (state, { payload }) => {
        state.allUsers.splice(
          state.allUsers.findIndex((user) => user.id === payload.id),
          1
        );
      })
      .addCase(updateSingleUser.fulfilled, (state, { payload }) => {
        state.singleUser = payload;
        state.allUsers = state.allUsers.map((user) => {
          if (user.id === payload.id) {
            return payload;
          }
          return user;
        });
      });
  },
});

export default userSlice.reducer;
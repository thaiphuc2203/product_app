// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseApi } from '../../api/baseApi';

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const response = await baseApi.get('http://localhost:3001/api/v1/products');
  console.log(response,'response')
  return response.data;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loading: 'idle', // 'idle' | 'pending' | 'fulfilled' | 'rejected'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log(action, 'action')
        state.loading = 'fulfilled';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
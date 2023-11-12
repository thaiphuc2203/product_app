// brandSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseApi } from '../../api/baseApi';

export const fetchBrands = createAsyncThunk('product/fetchBrands', async () => {
  const response = await baseApi.get('http://localhost:3001/api/v1/brands');
  console.log(response,'response')
  return response.data;
});

const brandSlice = createSlice({
  name: 'brand',
  initialState: {
    brands: [],
    loading: 'idle', // 'idle' | 'pending' | 'fulfilled' | 'rejected'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        console.log(action, 'action')
        state.loading = 'fulfilled';
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
      });
  },
});

export default brandSlice.reducer;
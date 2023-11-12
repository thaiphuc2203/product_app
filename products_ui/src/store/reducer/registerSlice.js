import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk('register/registerUser', async (userData) => {
  const response = await axios.post('http://localhost:3001/register', userData);
  return response.data;
});

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    status: 'idle', // 'idle' | 'pending' | 'fulfilled' | 'rejected'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'fulfilled';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  },
});

export default registerSlice.reducer;
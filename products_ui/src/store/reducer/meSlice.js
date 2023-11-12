import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseApi } from '../../api/baseApi';

// Define an async thunk to fetch user data
export const fetchUserData = createAsyncThunk('me/fetchUserData', async () => {
  const response = await baseApi.get('http://localhost:3001/me');
  return response.data;
});

const meSlice = createSlice({
  name: 'me',
  initialState: {
    data: null,
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        console.log(action,'fulfilled')
        state.loading = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        console.log(action,'rejected')
        state.loading = 'rejected';
        state.error = action.error.message;
      });
  },
});

export default meSlice.reducer;

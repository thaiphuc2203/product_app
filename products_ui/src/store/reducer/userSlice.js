import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../api/index';
const initialState = {
    isLoggedIn: false,
    message:'',
    user: {}
  };
  
export const isLoggedIn = createAsyncThunk('user/isLoggedIn', async () => {
    return userApi
        .isLoggedIn()
        .then(function (response) {
        console.log(response, 'isLoggedIn')
        return response;
        })
        .catch(function (error) {
            console.log(error, 'error');
        });
});
export const logOut = createAsyncThunk('user/logOut', async () => {
    return userApi
        .logOut()
        .then(function (response) {
        console.log(response, 'logOut')
        return response;
        })
        .catch(function (error) {
            console.log(error, 'error');
        });
});




const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [isLoggedIn.fulfilled]: (state, action) => {
      console.log(action.payload,'action')
      // state.isLoggedIn = action.payload.logged_in
      
      // if (action.payload.user){
      //   state.user =  action.payload.user 
      // }
      // if (action.payload.message){
      //   state.message =  action.payload.message 
      // }
    },
    [logOut.fulfilled]: (state, action) => {
      if (action.payload.logged_out){
        state.isLoggedIn =  false 
        state.message = ''
        state.user = {}
      }
    },
  },
});
export default userSlice.reducer;

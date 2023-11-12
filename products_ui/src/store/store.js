import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducer/counterSlice';
import userReducer from './reducer/userSlice';
import authReducer from './reducer/authSlice';
import meSlice from './reducer/meSlice';
import registerSlice from './reducer/registerSlice';
import productSlice from './reducer/productSlice';
import brandSlice from './reducer/brandSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    auth: authReducer,
    me: meSlice,
    register: registerSlice,
    product: productSlice,
    brand: brandSlice,
  },
});

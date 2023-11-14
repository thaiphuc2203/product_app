import { combineReducers } from 'redux';

import userReducer from './userSlice';
import authReducer from './authSlice';
import meSlice from './meSlice';
import registerSlice from './registerSlice';
import productSlice from './productSlice';
import brandSlice from './brandSlice';


export const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    me: meSlice,
    register: registerSlice,
    product: productSlice,
    brand: brandSlice,
});
import {configureStore}  from '@reduxjs/toolkit';
import signSlice from './slices/sign.slice';
import cartSlice from './slices/cart.slice';

export const store = configureStore({
    reducer: {

        isSigned: signSlice,
        cart: cartSlice
    }
})
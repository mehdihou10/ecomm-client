import {configureStore}  from '@reduxjs/toolkit';
import signSlice from './slices/sign.slice';

export const store = configureStore({
    reducer: {

        isSigned: signSlice
    }
})
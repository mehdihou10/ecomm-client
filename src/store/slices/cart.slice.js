import {createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import { url } from "../../api/api.url";
import { getCookie } from '../../functions/cookies';


const cartSlice = createSlice({
    name: "cartSlice",
    initialState: false,
    reducers: {

        updateCart: (state,action)=>{

            return !state
        }
    }
})

export const {updateCart} = cartSlice.actions;
export default cartSlice.reducer;
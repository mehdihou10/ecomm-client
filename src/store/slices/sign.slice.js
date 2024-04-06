import {createSlice} from '@reduxjs/toolkit';
import {isCookieExists} from '../../functions/cookies';


const signSlice = createSlice({

    name: "signSlice",
    initialState: false,
    reducers: {

        isSigned: (state,action)=>{

            return isCookieExists()
        }
    }
})

export const {isSigned} = signSlice.actions;
export default signSlice.reducer;
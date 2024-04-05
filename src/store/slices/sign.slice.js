import {createSlice} from '@reduxjs/toolkit';


const signSlice = createSlice({

    name: "signSlice",
    initialState: false,
    reducers: {

        isSigned: (state,action)=>{

            if(window.localStorage.getItem('user')){

                return true;

            }
            return false;
        }
    }
})

export const {isSigned} = signSlice.actions;
export default signSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status: 'idle',
    drawerDetails:[],
    error: null
}


export const drawerSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers:{
        fetchDrawerDetailsBegin: (state, action)=>{
            return {
                ...state,
                status: 'loading',
            }
        },
        fetchDrawerDetailsSuccess: (state, action)=>{
            return {
                ...state,
                status: 'succeeded',
                drawerDetails: action.payload
            }

        },
        fetchDrawerDetailsError: (state, action)=>{
            return {
                ...state,
                error: action.payload,
                status:'failed'
            }
        }
    }
})

export const selectDrawerDetails = state => state.drawer.drawerDetails;
export const selectDrawerStatus = state => state.drawer.status;
export const selectDrawerError = state => state.drawer.error;

export const { fetchDrawerDetailsBegin, fetchDrawerDetailsError, fetchDrawerDetailsSuccess} = drawerSlice.actions;

export default drawerSlice.reducer;

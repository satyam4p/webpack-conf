import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  status: 'idle',
  profile: null,
  error: null
}


export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers:{
    fethcProfileBegin: (state, action)=>{
      return {
        ...state,
        status:'loading',
      }
    },
    fetchProfileSuccess: (state, action)=>{

      return{
        ...state,
        profile: action.payload,
        status: 'succeeded',
      }
    },
    fetchProfileFailed: (state, action)=>{

      return {
        ...state,
        error: action.payload,
        status: 'failed',
        profile: null
      }
    }
  }
});

export const selectUserProfile = state=> state.userProfile.profile;
export const selectStatus = state=> state.userProfile.status;
export const selectError = state=> state.userProfile.error;

export const { fetchProfileFailed,fetchProfileSuccess, fethcProfileBegin} = userProfileSlice.actions;
export default userProfileSlice.reducer;

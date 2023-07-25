import { createSlice } from "@reduxjs/toolkit";


let initialState = {
    status: 'idle',
    tasks: [],
    error: null
}


export const BoardSlice = createSlice({
    name: 'board',
    initialState,
    reducers:{
        fetchBoardTasksBegin: (state, action)=>{
            return {
                ...state,
                status: 'loading',
            }
        },
        fetchBoardtasksSuccess: (state, action)=>{
            return{
                ...state,
                status: 'succeeded',
                tasks: action.payload
            }
        },
        fetchBoardTasksError: (state, action)=>{
            return{
                ...state,
                status: 'failed',
                error: action.payload
            }
        }
    }
})

export const selectBoardTasks = state => state.board.tasks;
export const selectBoardTasksStatus = state => state.board.status;
export const selectBoardTasksError = state => state.board.error;


export const {fetchBoardTasksBegin, fetchBoardtasksSuccess, fetchBoardTasksError} = BoardSlice.actions;

export default BoardSlice.reducer;

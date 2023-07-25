import { useCallback } from "react";
import { fetchBoardTasksBegin, fetchBoardtasksSuccess, fetchBoardTasksError } from "../../features/Board/BoardSlice";
import useAxiosPrivate from "./useAxiosPrivate";
import { useDispatch } from "react-redux";
import urlSchema from '../../network/urlSchema/urlSchema.json';

const useTasks = ()=>{
    const dispatch = useDispatch();
    const axiosprivate = useAxiosPrivate();
    const fetchTasks = useCallback(async () =>{
        const URL = urlSchema.Tasks.FETCH_ALL;
        console.log("URL:: ",URL);
        try{
            dispatch(fetchBoardTasksBegin); 
            const result = await axiosprivate.get(URL);
            if(result && result.data){
                const tasks = Object.values(result.data);
                dispatch(fetchBoardtasksSuccess(tasks));
            }
        }catch(error){
            dispatch(fetchBoardTasksError(error));
        }
    },[ axiosprivate, dispatch ]) 
    return fetchTasks;
}

export default useTasks;
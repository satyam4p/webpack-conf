import { useCallback } from "react";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "./useAxiosPrivate";
import urlSchema from '../../network/urlSchema/urlSchema.json';
import { fetchTaskCommentsBegin, fetchTaskCommentsSuccess, fetchTaskCommentsError } from "../../features/task/taskSlice";


const useGetComments =()=>{

    const dispatch = useDispatch();
    const axios = useAxiosPrivate();

    const getComments = useCallback(
        async (taskId)=>{
            try{
                dispatch(fetchTaskCommentsBegin());
                const URL = urlSchema.Commnets.GET_ALL_TASK_COMMENTS.replace(':id',taskId);
                const result = await axios.get(URL);
                if(result && result.data){
                    dispatch(fetchTaskCommentsSuccess(result.data));
                }else{
                    dispatch(fetchTaskCommentsError("an error occured while fetching the comments"));
                    console.log("an error occured while fetching the comments");
                }
    
            }catch(error){
                dispatch(fetchTaskCommentsError(error));
                console.log("an error occured while fetching the comments",error);
            }
        },[axios, dispatch]) 
    return getComments;

}

export default useGetComments;
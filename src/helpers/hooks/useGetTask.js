import { useDispatch } from "react-redux";
import useAxiosPrivate from './useAxiosPrivate';
import urlSchema from '../../network/urlSchema/urlSchema.json';
import { fetchTaskBegin, fetchTaskSuccess, fetchTaskError } from "../../features/task/taskSlice";

const useGetTask = ()=>{

    const axios = useAxiosPrivate();
    const dispatch = useDispatch();

    const getTask = async (taskId)=>{

        try{
            dispatch(fetchTaskBegin());
            const URL = urlSchema.Tasks.GET_TASK.replace(':id',taskId);
            const result = await axios.get(URL);
            if(result && result.data){
                dispatch(fetchTaskSuccess(result?.data));
            }else{
                dispatch(fetchTaskError("task not found"));
            }
        }catch(error){
            dispatch(fetchTaskError(error));
            console.log("an error occured while fetching task:: ",error);
        }
    }
    return getTask;

}

export default useGetTask;
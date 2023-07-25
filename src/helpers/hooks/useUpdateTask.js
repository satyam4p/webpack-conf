import { useContext } from "react";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "./useAxiosPrivate";
import urlSchema from '../../network/urlSchema/urlSchema.json';
import TaskContext from "../../common/Modals/Task/TaskContext/TaskProvider";
import useNotification from "../../common/Notification/helpers/useNotification";
import { updateTaskBegin, updateTaskSuccess, updateTaskError } from "../../features/task/taskSlice";
import useDrawerDetails from "./useDrawerDetails";


const useUpdateTask =() => {
    const { setTask } = useContext(TaskContext);
    const show  = useNotification();
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const fetchDrawerDetails = useDrawerDetails()

    const update = async (taskId, payload )=>{

        const UPDATE_URL = urlSchema.Tasks.PATCH_TASK.replace(':id', taskId);
        
        try{
            dispatch(updateTaskBegin());
            const updatedTask = await axiosPrivate.patch(UPDATE_URL, payload);
            if(updatedTask){
                show("Task Updated successfully", "success");
                setTask(prevTask=>{
                    return {
                        ...prevTask,
                        editEnabled : false
                    }
                });
                dispatch(updateTaskSuccess(updatedTask?.data))
                fetchDrawerDetails("Recent Tasks");
            }
        }catch(error){
            console.log("error:: ",error);
            show("some error occured", "warning");
            dispatch(updateTaskError(error));
        }

    }

    return update;

}

export default useUpdateTask;
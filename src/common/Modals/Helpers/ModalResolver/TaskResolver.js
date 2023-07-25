import { axiosPrivate } from "../../../../network/axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, createTaskSuccess, selectAllTasks, selectError, selectStatus } from "../../../../features/task/taskSlice";

/* add reducers and actions*/
/**
 * 
 * @param {*} action
 * @param {*} details 
 */
const TaskResolver = (event, action, dispatch )=>{

    return {
        fetchTask: (event, dispatch) =>{
            event.preventDefault();
            dispatch(fetchTasks()); 
        },
        createTask: event =>{
            /**sAMPLE PAYLOAD */
            /**
             * {
                "name": "askhjdg test",
                "InitialDate": "12 May, 2022",
                "finalDate": "12 Dec, 2022",
                "status": "In Progress",
                "description": "create",
                assignee: 978346hasbd7823
                "label":"Bug"
            }
             */
            // const payload = event?.data;
            event.preventDefault();
            const payload = {
                "name": "askhjdg test",
                "InitialDate": "12 May, 2022",
                "finalDate": "12 Dec, 2022",
                "status": "In Progress",
                "description": "create",
                "label":"Bug"
            }
            if(payload){
                dispatch(createTaskSuccess(payload));
            }
        },
        updateTask: event=>{

        },
        deleteTask: event =>{

        }
    }[action](event, dispatch);
    

}

export default TaskResolver;
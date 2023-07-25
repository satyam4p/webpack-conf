import { useState, useContext, useEffect, useCallback } from "react";
import { Input } from 'antd';
import TaskContext from "../../Modals/Task/TaskContext/TaskProvider";
import { cloneDeep } from "lodash";
import debounce from "../../../helpers/commonUtils/debounce";
import { useSelector } from "react-redux";
import { selectCurrentTask } from "../../../features/task/taskSlice";
import './stylesheet.scss'

const TextField = (props) => {
    const {setTask} = useContext(TaskContext);
    const currentTask = useSelector(selectCurrentTask);
    const entityKey = props.config?.entityKey || "name";
    const [textValue, setValue] = useState( currentTask && currentTask[entityKey] ? currentTask[entityKey] :  null);
    const handleChange = ( event ) =>{
        event.preventDefault();
        const value = event.target.value;
        setValue(value);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateParentState = useCallback(
        debounce(value=>{
            /** this 'status' value in taskData is hardCoded but should be actually picked from configuration and updated accordingly */
            setTask(prevTask=>{
                let taskClone = cloneDeep(prevTask);
                if(props.type && props.type === "header"){
                    taskClone.taskData['name'] = value;    
                }else{
                    taskClone.taskData['status'] = value;
                }
                return{
                    ...prevTask,
                    taskData: taskClone.taskData
                }
            });
        }, 400), []);

    useEffect(()=>{
       updateParentState(textValue);
    },[textValue, setValue, updateParentState])

    

    return(
        <Input
            className={`text-container ${props.type}`}
            value = {textValue}
            type="text"
            autoComplete="off"
            sx={{
                padding:'5px',
            }}
            onChange={handleChange}
            disabled = {!props.editEnabled}
        />
    )

}

export default TextField;


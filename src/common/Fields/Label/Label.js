import React, { useState, useEffect, useContext, useCallback } from "react";
import './stylesheet.scss'
import TaskContext from "../../Modals/Task/TaskContext/TaskProvider";
import { cloneDeep } from "lodash";
import debounce from "../../../helpers/commonUtils/debounce";
import { useSelector } from "react-redux";
import { selectCurrentTask } from "../../../features/task/taskSlice";

const LabelField = (props)=>{
    const currentTask = useSelector(selectCurrentTask);
    const { setTask } = useContext(TaskContext);
    const entityKey = props.config ? props.config?.entityKey : ''; 
    const [value, setValue] = useState( currentTask && currentTask[entityKey] ? currentTask[entityKey] : "Bug" );
    const labelOptions = ["Bug", "RCA", "Task"]
    const handleSelect = (e)=>{
        e.preventDefault();
        setValue(e.target.value);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateParentState = useCallback(
        debounce(value=>{
            /** this 'status' value in taskData is hardCoded but should be actually picked from configuration and updated accordingly */
            setTask(prevTask=>{
               let taskClone = cloneDeep(prevTask);
               taskClone.taskData['label'] = value;
               return {
                   ...prevTask,
                   taskData: taskClone.taskData
               }   
              });
        }, 400), [setTask,value]);

    useEffect(()=>{
        updateParentState(value);
     },[value, setValue, updateParentState])
 
    
    return(
        <div>
           <select sx = {{
                minWidth:'120px'
            }} 
            className={`label-container ${value}`}
            value={value}
            disabled={!props.editEnabled}
            arrow = {
            <section
                as="svg"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentcolor"
                sx={{
                ml: -28,
                alignSelf: 'center',
                pointerEvents: 'none',
                }}>
                <path d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
            </section>
            }
            onChange={e=>handleSelect(e)}
            >
            {labelOptions.map((option, key)=>{
                return (
                    <option key={key}>
                        {option}
                    </option>
                )
            })}
            </select>
        </div>
    )
}

export default LabelField;
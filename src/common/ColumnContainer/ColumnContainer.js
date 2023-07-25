import React, { useEffect, useState } from 'react';
import AxiosAjax from '../../network/axiosAjax';
import { Row } from 'antd';
import Column from '../Columns/Column';
import './stylesheet.scss';
import ToggleTrigger from '../toggleTrigger/ToggleTrigger';
import useStatusTask from '../../helpers/hooks/useStatusTask';
import { cloneDeep, findIndex, isEqual } from 'lodash';

const axiosAjax = new AxiosAjax();

const ColumnContainer = (_props) =>{
    
    const [ collapse, setCollapse ] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const colTypes = ['Active','In Progress', 'Complete', 'New'];

    const [ taskAsPerStatus, getTaskAsperStatus ] = useStatusTask();

    useEffect(()=>{
        axiosAjax.makeRequest('http://localhost:9000/tasks', 'GET').then(response=>{
            if(response.status == 200){
                for(let i=0; i < colTypes.length; i++){
                    const colType = colTypes[i];
                    const tasks = getTaskAsperStatus(response.data,colType);
                    setTaskList(prev=>{
                        return {
                                ...prev,
                                [colType]: [...tasks]
                            }
                    })
                }
            }
        })
    },[])

    const handleTaskChange = (id, fromColType, toColType)=>{
        let taskListCP = cloneDeep(taskList);
        let task = taskListCP[fromColType].filter(task=>{
            if(task.id == id){
                return {...task};
               }
        });
        const colTypeOfTask = task[0]['status'];
        const toModifyArr = taskListCP[colTypeOfTask];
        task[0].status = toColType;
        const index = findIndex(toModifyArr,(task)=>task.id == id);
        /** logic to remove the task from previous column and add the task to new column and update state */
        toModifyArr.splice(index,1);
        taskListCP[toColType].push(task[0]);
        setTaskList((prevTaskList)=>{
                if(!isEqual(prevTaskList, taskListCP)){
                    return {...taskListCP};
                }
        })
    }

    return(
        <div className={`column-container toggle-${collapse}`}>
            <ToggleTrigger
                collapse={collapse}
                setCollapse={setCollapse}
                user = "Satyam Kumar"
                />
            {colTypes ? 
                colTypes.map((colType, key)=>{
                    return <Column 
                                key={key} 
                                collapse={collapse} 
                                colType={colType} 
                                sampleTask = { taskList[colType] }
                                handleTaskChange = {handleTaskChange}
                                />
                }) : null
            }
        </div>
    )
}

export default ColumnContainer;
import { cloneDeep } from "lodash";

export const initialiseTaskTable = (tasks, setTaskMap)=>{
    
    if(tasks){

        let taskMap = new Map();
        for(let task of tasks){
            taskMap.set(task?._id, task);
        }
        setTaskMap(taskMap);

    }

    return null;
}

export const taskNameUpdate = (taskMap, value, id, setTaskMap)=>{

    let targetTask = cloneDeep(taskMap.get(id));

    targetTask['name'] = value;
    taskMap.set(id, targetTask);
    setTaskMap(taskMap);

}
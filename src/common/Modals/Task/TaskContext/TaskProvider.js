import { createContext, useState } from "react";
import StateFactory from "../../Helpers/StateFactry";

const TaskContext = createContext({});

export const TaskProvider = ({children})=>{

    const [task, setTask] = useState(StateFactory());

    return(
        <TaskContext.Provider value={{task, setTask}}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContext;
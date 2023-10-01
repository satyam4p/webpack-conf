/** OOB imports */
import React,{Suspense, useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

/** Contexts */
import TaskContext from "./TaskContext/TaskProvider";

/** custom components */
import TaskHeader from "./TaskModalHeader/TaskHeader"; 
import TaskActionBar from "./TaskActionsBar/TaskActionBar";
import TextLoader from "../../Loaders/simpleTextLoader";
import FieldMapper from "../../Fields/FieldMappingMaster";
import TextEditor from "../../TextEditor/TextEditor";

/** Helper custom hooks */
import useCreateAndGetTask from "../../../helpers/hooks/useCreateAndGetTask";
import useTaskConfig from "../../../helpers/hooks/useTaskConfig";
import useUpdateTask from "../../../helpers/hooks/useUpdateTask";
import useDeleteTask from "../../../helpers/hooks/useDeleteTask";

/**custom redux helpers */
import { selectCurrentTaskStatus, 
    selectTaskConfig,
    selectCurrentTask,
    clearCurrentTask } from "../../../features/task/taskSlice";

/** Styling */
import './stylesheet.scss';

/**lazy components */
const Comments = React.lazy(()=>import('../../Comments/comments'));

const TaskModal=(props)=>{

    const { task, setTask } = useContext( TaskContext );
    const create = useCreateAndGetTask();
    const update = useUpdateTask();
    const deleteTask = useDeleteTask();
    const [configLoaded, fetchConfig] = useTaskConfig();
    
    useEffect(()=>{
        fetchConfig();
    },[fetchConfig]);
    const [activeTab, setActiveTab] = useState('comments');
    const dispatch = useDispatch();
    const currentTaskStatus = useSelector(selectCurrentTaskStatus);
    const taskConfig = useSelector(selectTaskConfig);
    const currentTask = useSelector(selectCurrentTask);

    const toggleTab=(event, type)=>{
        event.preventDefault();
        setActiveTab(type);
    }
   
    const handleEdit= (e) => {
        e.preventDefault();
        setTask(prevTask=>{
            return {
                ...prevTask,
                editEnabled: true
            }
        })
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(currentTask?._id){
            update(currentTask?._id, task.taskData);
        }else{
            create(task.taskData);
        }
    }

    const handleShare=(e)=>{
        e.preventDefault();
    }

    const handleClose =(e)=>{
        e.preventDefault();
        dispatch(clearCurrentTask());
        props.setModalType((prev)=>{
                return {
                    ...prev,
                    isVisible:false
                }
            })
    }

    const handleMoreAction = (e, identifier )=>{
        e.preventDefault();
        e.stopPropagation();
        const identifierSmall = identifier.split(" ").join('_').toLowerCase();
        switch(identifierSmall){
            case "delete_task":
                const taskId = currentTask?._id;
                deleteTask(taskId);
                props.setModalType((prev)=>{
                    return {
                        ...prev,
                        isVisible:false
                    }
                })
                return;
            case "save_and_exit":
                handleSubmit(e);
                handleClose(e);

                return
            default:
                return
        }
    }

    return(
        <div className={`task-modal-container modal`}>
            {
                (configLoaded && (currentTaskStatus === "idle" || 
                                currentTaskStatus === "succeeded" || 
                                currentTaskStatus === "failed" )) ? 
                <>
                    <section>
                        <form onSubmit = {(e)=>{handleSubmit(e)}}>
                            <TaskActionBar 
                                handleClose = { handleClose } 
                                handleShare = {handleShare} 
                                handleEdit = {handleEdit}
                                currentTaskStatus = {currentTaskStatus}
                                editEnabled = { task.editEnabled }  
                                handleMoreAction = {handleMoreAction}
                                />

                            <TaskHeader editEnabled = {task.editEnabled} config = {taskConfig}/>
                            <section style={{
                                width:'90%',
                                margin:'10px 0px 10px 0px',
                                display:'flex',
                                flexDirection:'column',
                                justifyContent:'space-between',
                                minHeight:'10em'
                            }}>
                                <div style={{
                                    display:'flex',
                                    alignItems:'center',
                                    flexDirection:'column',
                                    margin:'4px',
                                }}>
                                    { taskConfig.map((field, key)=>{
                                        if(field.entityKey !== "name" && field.entityKey !== "description"){
                                            return(
                                                <FieldMapper
                                                    config = {field}
                                                    key = {key} 
                                                    field = {field.entityType}
                                                    label = {field.label}
                                                    icon =  {field.icon}
                                                    options = {field.options}
                                                    editEnabled = {task.editEnabled}
                                                />
                                            )
                                        }
                                        return null;
                                    })}
                                </div>
                            </section>
                        </form>
                    </section> 
                    <section
                        style={{
                            width:'100%%',
                            marginTop:'20px',
                            display:'flex',
                            flexDirection:'column',
                            alignItems:'center'
                        }}>
                        <div style={{
                            borderBottom:'0.5px solid #DEDEDE',
                            width:'90%',
                            display:'flex',
                            justifyContent:'flex-start'
                        }}>
                            <button style={{
                                // borderBottom:()=>activeTab ==='comments' ? '2px solid #476451' : 'none',
                                borderTop:'none',
                                borderLeft:'none',
                                borderRight:'none',
                                bg:'transparent',
                                padding:'4px',
                                fontSize:'12px',
                                '&:hover':{
                                    border:'1px solid #F6F6F6'
                                },
                            }}
                            onClick={e=>toggleTab(e,'comments')}
                            >
                                <span>Comments</span>
                            </button>
                            <button style={{
                                // borderBottom:()=>activeTab ==='description' ? '2px solid #476451' : 'none',
                                borderTop:'none',
                                borderLeft:'none',
                                borderRight:'none',
                                bg:'transparent',
                                padding:'4px',
                                fontSize:'12px',
                            }}
                            onClick={e=>toggleTab(e,'description')}
                            >
                                <span>Description</span>
                            </button>
                        </div>
                        <section className="data-container" style={{width:'90%', padding:'10px 0px'}}>
                            <Suspense fallback={<TextLoader/>}>
                                { activeTab === 'comments' 
                                    ? <Comments editEnabled = {task.editEnabled}/>
                                    : <TextEditor config = {taskConfig} editEnabled = {task.editEnabled}/>
                                }
                            </Suspense>
                        </section>
                    </section>
                </> :
                <div style={{width:'100%', height:'100%', display:'flex', justifyContent:"center", alignItems:'center' }}>
                    <h4>Loading...</h4>
                </div>

        }
        </div>
    )
}
export default TaskModal;
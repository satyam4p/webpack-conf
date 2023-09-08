import React, { useEffect, useState, useContext, useCallback } from "react";
import iconsMap from "../IconsMapper/IconsMap";
import shortid from "shortid";
import ThemeContext from "../../theme/themeContext";
// import TextAreaField from "../Fields/TextArea/TextArea";
import useAuth from "../../helpers/hooks/useAuth";
import { selectComments, selectCurrentTask, selectCommentStatus } from "../../features/task/taskSlice";
import { useSelector } from "react-redux";
import CommentActions from "./CommentActions/CommentsAction";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
import TaskContext from "../Modals/Task/TaskContext/TaskProvider";
import debounce from '../../helpers/commonUtils/debounce';
import useGetComments from "../../helpers/hooks/useGetCommens";
import { cloneDeep } from "lodash";
import CommentsSkeleton from "./Skeleton/CommentsSkeleton";


const Comments =(props)=>{

    const {theme} = useContext(ThemeContext);
    const [value, setValue] = useState();
    const commentStatus = useSelector(selectCommentStatus);
    const entityKey = "userComment";
    const { auth } = useAuth();
    const {setTask} = useContext(TaskContext);
    const currentTask = useSelector(selectCurrentTask);
    
    let comments = useSelector(selectComments);

    const taskComments = comments && comments.length ? cloneDeep(comments) : [];
    const getComments = useGetComments();

    /**check if the task is cerated if yes then allow adding comments */
    const isEditable = currentTask && currentTask?._id;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateParent = useCallback(
        debounce( value =>{
            setTask( prevTask => {
                if(entityKey){
                    return {
                        ...prevTask,
                        [entityKey]: value
                    }
                }
            })
        }, 200), []
    );
        

    useEffect(()=>{
        if(currentTask && currentTask?._id){
            getComments(currentTask?._id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        updateParent(value)
    }, [value, setValue, updateParent]);

    

    const handleChange = (e)=>{
        e.preventDefault();
        let value = e.target.value
        setValue(value);
    }

    const isActionEnabled = value && value.trim() && value.length > 0 ? true : false;

    return(
        <div className="comments-container">
            <div className="section-comment" sx={{
                        marginY:'8px',
                        paddingY:'4px',
                    }}>
                <div className="username-text">
                    <span style={{textTransform:'capitalize',fontSize:'14px'}}>{iconsMap.profile(18)} {auth?.user?.username}</span>
                </div>
                    <TextArea 
                        style={{fontSize:'12px'}}
                        disabled = {!isEditable}  
                        className={`text-area-container ${theme}`}
                        value = {value}
                        onChange = {e=>handleChange(e)}
                    />
                <CommentActions setValue = {setValue} actionsEnabled = {isActionEnabled}/>
            </div>
            {commentStatus === "loading" ?
                <CommentsSkeleton/>
                :
                taskComments && taskComments.length ? taskComments.reverse().map((comment, key) => {
                    let localTime  = moment(comment?.postedAt).fromNow();
                    return (
                        <div key={shortid.generate()} style={{
                            paddingY:'4px',
                        }}>
                        <div style={{
                            marginY:'4px'
                        }}>
                            <span style={{fontSize:'12px', fontWeight:'500', textTransform: 'capitalize'}}>{iconsMap.profile(16)} {comment.user?.username}   </span>
                            <span style={{fontSize:'10px', fontWeight:'normal'}}>{localTime}</span>
                        </div>
                        <div style={{padding:'4px', fontWeight:'normal'}}>
                            {comment.body}
                        </div>
                    </div>
                    )
                }) : null  
            }
            
        </div>
    )
}

export default Comments;
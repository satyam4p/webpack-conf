import React, {useEffect, useContext, useState, useCallback} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import TaskContext from '../Modals/Task/TaskContext/TaskProvider';
import './stylesheet.scss';
import debounce from '../../helpers/commonUtils/debounce';
import { cloneDeep } from 'lodash';
import { selectCurrentTask } from '../../features/task/taskSlice';
import { useSelector } from 'react-redux';


const TextEditor = (props)=>{

    const currentTask = useSelector(selectCurrentTask);

    const [editorState, setEditorState] = useState();

    useEffect(()=>{

        const rawContent = currentTask && currentTask['description'] ? currentTask['description'] : {};
        const editorContent =  rawContent && Object.keys(rawContent).length ? convertFromRaw(JSON.parse(rawContent)) : null;
        let editorStateInitial = '';

        if(editorContent){
            editorStateInitial = EditorState.createWithContent(editorContent);
        } else {
            editorStateInitial = EditorState.createEmpty();
        }

        setEditorState(editorStateInitial);

    },[currentTask]);

    const { setTask } = useContext(TaskContext); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateParentState = useCallback(
        debounce((editorState)=>{
            setTask(prevTask=>{
                const currentState = editorState.getCurrentContent();
                const rawContent = convertToRaw(currentState);
                let taskClone = cloneDeep(prevTask);
                taskClone.taskData['description'] = JSON.stringify(rawContent);
                return {
                    ...prevTask,
                    taskData: taskClone.taskData
                }});
        },4),[])

    useEffect(()=>{
        if(editorState !== undefined){
            updateParentState(editorState);
        }
    },[ editorState, updateParentState]);
    
    return(
        <div className= 'text-editor--container'>
            <Editor
                readOnly = {!props.editEnabled}
                editorState={editorState}
                onEditorStateChange = {setEditorState}
                toolbar={{
                    options: ['inline', 'fontSize', 'fontFamily', 'history'],
                    'fontFamily':{
                        options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                    }
                  }}
            />
        </div>
    )
}
export default TextEditor;

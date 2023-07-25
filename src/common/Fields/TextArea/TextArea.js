import React, {useState, useContext, useEffect, useCallback} from "react";
import './stylesheet.scss';
import { Input } from "antd";
import TaskContext from "../../Modals/Task/TaskContext/TaskProvider";
import debounce from "../../../helpers/commonUtils/debounce"; 

const {TextArea} = Input;
const TextAreaField =(props)=>{
    
    const { setTask } = useContext(TaskContext)
    const entityKey = props?.entityKey;
    const [value, setValue] = useState(props.value);

    const handleChange = (e)=>{
        e.preventDefault();
        let value = e.target.value
        setValue(value);
    }

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
        }, 400), []);

    useEffect(()=>{
        updateParent(value)
    }, [value, setValue, updateParent]);

    

    return(
        <TextArea 
            className="text-area-container"
            value = {value}
            onChange = {e=>handleChange(e)}
            disabled={ !props.editEnabled }
        />
    )
}

export default TextAreaField;
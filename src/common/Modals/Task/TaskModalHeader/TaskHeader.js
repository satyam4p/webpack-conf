import TextField from "../../../Fields/Text/TextField";

const TaskHeader = (props)=>{

    return(
        <TextField editEnabled = {props.editEnabled} type= {'header'}/>
    )
}
export default TaskHeader;
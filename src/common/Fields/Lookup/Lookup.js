/** generic Lookup field
 * @author Satyam
 * 
 */
import { cloneDeep, debounce } from 'lodash';
import React, { useState, useContext, useEffect, useCallback } from 'react';
import TaskContext from '../../Modals/Task/TaskContext/TaskProvider';
import './stylesheet.scss';
import useAxiosPrivate from '../../../helpers/hooks/useAxiosPrivate';
import urlSchema from '../../../network/urlSchema/urlSchema.json';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentTask } from '../../../features/task/taskSlice';
import { fetchOptionsBegin, fetchOptionsSuccess, fetchOptionsError } from '../../../features/task/taskSlice';

const LookupField = (props) => {

    const dispatch = useDispatch();
    const currentTask = useSelector(selectCurrentTask);
    const [options, setOptions] = useState( currentTask && currentTask?.choices ? currentTask?.choices : []);

    const entityKey = props.config && props.config?.entityKey ?  props.config?.entityKey : null;
    const { setTask } = useContext(TaskContext);

    const displayValue = (()=>{
      if(currentTask && currentTask[entityKey] && currentTask?.choices && currentTask?.choices.length){
        console.log("currentTask[entityKey]:: ",currentTask[entityKey])
         return currentTask?.choices.filter(choice=>choice.id === currentTask[entityKey])[0].username;
      }
      return null;
    })()

    const [value, setValue] = useState( displayValue );
    const axiosPrivate = useAxiosPrivate();
  

    const handleChange = (e) =>{
      e.preventDefault()
      const value = e.target.value;
      setValue(value);
    }
    const handleClick= async ()=>{
      if(options.length > 0){
        return;
      }
      await getOptions();
    }

    const getOptions = useCallback( async ()=> {
      
      try {
        dispatch(fetchOptionsBegin());
        const url = urlSchema.Choices.GETC_CHOICES.replace("value", entityKey);
        const usersList = await axiosPrivate.get(url);

        if(usersList && usersList.data) {
          dispatch(fetchOptionsSuccess(usersList.data)); 
          setOptions(usersList.data);
        }

      }catch(error) {
        dispatch(fetchOptionsError(error));
      }
    }, [dispatch, axiosPrivate, entityKey]) 

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateParentState = useCallback(
      debounce((value)=>{
        setTask((prevTask)=>{
          const taskClone = cloneDeep(prevTask);
          const user_id = value[0]?.id;
          taskClone.taskData[entityKey] = user_id;
          return {
            ...prevTask,
            taskData : taskClone.taskData
          }
        })
      }, 4),[]);

    useEffect(()=>{
      getOptions();
    },[ getOptions ])

    useEffect(()=>{
      if(options && options.length > 0){
        updateParentState(options.filter(user=>user.username === value));
      }
    },[value, setValue, updateParentState, options]);

    

  return(
    <div className='wrapper'>
      {
        props.editEnabled ?
          (
            <select 
              className={'lookup-container'}
              value = { value || displayValue }
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
              onClick={handleClick}
              onChange={handleChange}
              disabled={!props.editEnabled}
              >
              {options && options.length ? options.map((option, key)=>{
                return (
                    <option key={key}>
                      {option.username}
                    </option>
                )
              }): null}
          </select>
        ) :
        <span>
          {value}
        </span>
      } 
    </div>
  );
  
}
  

export default LookupField;
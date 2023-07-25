import React, { useEffect, useState }  from 'react';
import { cloneDeep, sample }  from 'lodash';
import { Col } from 'antd';
import Card from '../Card/Card';
import './stylesheet.scss';
import useStatusTask from '../../helpers/hooks/useStatusTask';
import Header from './Header/Header';
import isObjArrayEqual from '../../helpers/HOF/isObjArrEquals';
import AxiosAjax from '../../network/axiosAjax';
import Notification from '../../Components/Notification/Notification';

const Column= ({collapse, colType, sampleTask, handleTaskChange}) =>{
    const [notification, setNotification] = useState(false);
    const [notificationText, setNotificationText] = useState('');
    const handleDropEvent= async (ev)=>{
        const id = ev.dataTransfer.getData('taskID');
        const fromColType = ev.dataTransfer.getData('fromCol');
        let result = sampleTask.filter(task=>task.id == id);
        if(result.length < 1){
            const ajax = new AxiosAjax();
            const payload = {
                "status": colType
            }
            ajax.makeRequest(`http://localhost:9000/tasks/updateStatus/${id}`,'PATCH', {}, payload)
            .then(response=>{
                if(response.status == 200){
                    setNotificationText(response.data?.message);
                    setNotification(true);
                }
            });
            handleTaskChange(id, fromColType, colType);
        }
        /**logic to update the task status and update the taskAsPerstatus again */
        /** need to change the logic for updateing the sampleTask as
         *  when we re-render the sample task is same as before even after making modified task list */
    }

    /** need to create the loading skeleton as well */
    return(
        <>
        <Col 
        onDragOver={ev=>{
           ev.stopPropagation();
           ev.preventDefault();
        }}
        onDrop={ev=>{
            ev.stopPropagation();
            ev.preventDefault();
            handleDropEvent(ev);
        }}
        className={`col-container col-collapse-${collapse}`}>
            <Header name={colType} level={4} style="default"/>
            {sampleTask && sampleTask.map((task, key)=>{
                return(
                    <Card key = {task.id} task = { task }/>
                )
            })}
        </Col>
        {notification && (
            <Notification 
                notificationOn = {notification} 
                setNotification = {setNotification} 
                notificationText = {notificationText}
            />
        )}    
        </>
    )

}

export default Column;
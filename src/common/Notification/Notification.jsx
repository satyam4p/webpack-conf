import React, { useEffect } from 'react';
import useAuth from '../../helpers/hooks/useAuth';
import './stylesheet.scss';


const Notification = () => {
    const { showNotification, setNotification, notificationType, notificationText } = useAuth();

    useEffect(()=>{
        let timer = null;
        if(showNotification){
            timer = setTimeout(()=>{
                setNotification(false);
            }, 2000);
        }

        return ()=>clearTimeout(timer);
    },[showNotification]);

    return(
        <div className={`notification ${notificationType}`}>
            <div onClick={ e => setNotification(false)} className='close'>[X]</div>
            <div>
                <h4>{notificationText}</h4>
            </div>
            
        </div>
    )
}

export default Notification;
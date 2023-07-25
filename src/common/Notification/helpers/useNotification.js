import { useEffect } from "react";
import useAuth from "../../../helpers/hooks/useAuth";

const useNotification =()=>{
    
    const {showNotification ,setNotification, setNotificationType, setNotificationText} = useAuth();

    useEffect(()=>{
        if(showNotification){
            setTimeout(()=>{
                setNotification(false);
            },4000);
        }
    },[showNotification, setNotification]);
    
    const show = ( text, type ) =>{
        setNotificationText(text);
        setNotificationType(type)
        setNotification(true);
    }
    
    return show;
}

export default useNotification;
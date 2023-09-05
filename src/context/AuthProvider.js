import { createContext, useState } from "react";
import { authProvider } from "../helpers/authProvider/authProvider";
import useAxiosPrivate from "../helpers/hooks/useAxiosPrivate";
import urlSchema from '../network/urlSchema/urlSchema.json';
import { useNavigate } from "react-router";

const AuthContext = createContext({});

export const AuthProvider=({ children })=>{
    const axiosPrivate = useAxiosPrivate();
    const [ auth, setAuth] = useState({});
    const [ showNotification, setNotification] = useState(false);
    const [ notificationText, setNotificationText ] = useState();
    const [ notificationType, setNotificationType ] = useState();

    const signIn = (data, callback)=>{

        authProvider.signIn(data, (error, isAuthenticated, result)=>{
            
            if(error){
                console.log("error occured while signing in:: ",error);
                setAuth(null);
                return;
            }
            const {user, token} = result;
            setAuth({
                isAuthenticated,
                user,
                token
            })
            callback(isAuthenticated);
        })

    }

    const register = (data, callback)=>{
        authProvider.register(data, (error, response)=>{
            if(error){
                console.log("error occured while registering", error);
            }else{
                console.log("User registered successfuly")
                callback(response);
            }
        })
    }

    const signOut = async (type) =>{
        const LOGOUT = urlSchema.Auth.LOGOUT;
        const LOGOUT_ALL = urlSchema.Auth.LOGOUT_ALL;
        const response =  type === 'all' 
            ? await axiosPrivate.post(LOGOUT_ALL) 
            : await axiosPrivate.post(LOGOUT); 
        
        if(response.status ===  200){
            setAuth({});
            window.localStorage.removeItem('access_token');
            authProvider.isAuthenticated = false;
        }
    }

    return(
        <AuthContext.Provider value={{ auth, setAuth, signIn, register, signOut, showNotification, 
            setNotification, notificationType, setNotificationType, notificationText, setNotificationText}}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;
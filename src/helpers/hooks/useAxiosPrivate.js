import axiosPrivate from "../../network/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";


const useAxiosPrivate =()=>{

    const refresh = useRefreshToken();

    const {auth} = useAuth();

    useEffect(()=>{
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config=>{

                let authorization = config.headers['Authorization'];
                let bearer = authorization ? authorization.split(" ")[1] : authorization;
                
                if(!config.headers['Authorization'] ){
                    // config.headers['Authorization'] = `Bearer ${auth?.token}`;
                // }else{
                    let access_token = window.localStorage.getItem('access_token');
                    config.headers['Authorization'] = `Bearer ${access_token}`;
                }

                return config;
            }, (error)=> Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error)=>{
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent){ //the sent property shows that request was made 
                    prevRequest.sent = true; // we only want make one request for refreshtoken so setting it to true will make sure of it
                    const newToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    return axiosPrivate(prevRequest);
                }

                return Promise.reject(error);
            }
        );

        return ()=>{ /**we need to clean up the interceptor after maing he requests as it can bloat out requests if not removed */
            axiosPrivate.interceptors.request.eject(requestIntercept);    
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }

    },[auth, refresh])

    return axiosPrivate;

}

export default useAxiosPrivate;
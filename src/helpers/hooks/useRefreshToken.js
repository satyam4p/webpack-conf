import axios from "../../network/axios";
import useAuth from "./useAuth";

const useRefreshToken=()=>{
    const {setAuth} = useAuth();

    const refresh = async ()=>{
        axios.defaults.withCredentials = true;
        const response = await axios.get('/auth/refresh',
        { 
            withCredentials: true
        });
        if(response.status === 200){
            setAuth(prev=>{
                // console.log("prev:: ",prev.token);
                // console.log("new:: ",response?.data?.token);
                window.localStorage.setItem("access_token",response?.data?.token);
                return {...prev, isAuthenticated:true, user: response?.data?.user, token:response?.data?.token};
            });
            return response.data?.token;
        }
        
        return
        
    }
    return refresh;
}

export default useRefreshToken;
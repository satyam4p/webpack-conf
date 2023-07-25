import axios from "../../network/axios";
import urlSchema from '../../network/urlSchema/urlSchema.json';

let authProvider = {
    isAuthenticated: false,
    bearer:null,
    async signIn({email, password}, callback){
        const URL = urlSchema.Auth.LOGIN;
        try{
            const response = await axios.post(URL,
                { email, password },
                {
                    headers:{
                        'Content-Type':'application/json'
                    },
                    withCredentials:true
                }
            );
            if(response.status === 200){
                const user = response.data?.user;
                const token = response.data?.token;
                authProvider.isAuthenticated = true;
                authProvider.bearer = token;
                callback(null, authProvider.isAuthenticated, {user, token});
            }
        }catch(error){
            authProvider.isAuthenticated = false;
            callback(error);
        }

    },
    async register({email, password, repassword, username}, callback){

        const URL = urlSchema.Auth.REGISTER;
        try{

            let response = await axios.post(URL,
                { email, password, repassword , username},
                {
                    headers:{
                        'Content-Type':'application/json'
                    },
                    withCredentials:true
                });
            if(response && response.status === 200){
                callback(null, response?.data);
            }
        }catch(e){
            callback(e);
        }

    }
    // async signOut(type, callback){
    //     axios.head.
    //     try{
    //         const response =  type === 'all' 
    //         ? await axios.head
    //         : await axiosPrivate.post(LOGOUT_URL); 
            
    //     }
        

    // }

}

export {authProvider}
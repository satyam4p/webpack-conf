import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../helpers/hooks/useRefreshToken';
import useAuth from '../helpers/hooks/useAuth';
import './persisteUserStylesheet.scss';

const PersistUser =({children})=>{

    const { auth } = useAuth();
    const refresh = useRefreshToken();
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{

        let isMounted = true;
        const verifyRefreshToken = async () =>{
            try{
                await refresh();
            }catch(error){
                console.error(error);
            }
            finally{
                isMounted && setLoading(false);
            }
            console.log(auth.token);
        }
        !auth?.token ? verifyRefreshToken() : setLoading(false);

        return () => isMounted = false;
    },[])

    // useEffect(() => {
    //     console.log(`isLoading: ${isLoading}`)
    //     console.log(`aT: ${JSON.stringify(auth)}`)
    //     console.log(`aT: ${JSON.stringify(auth?.token)}`)
    // }, [isLoading])

    return(
        <>
            {
            isLoading 
                ? <div className='loader'><p>Loading....</p></div>
                : children
            }
        </>
    )
}

export default PersistUser;
import { replace } from "lodash";
import { useLocation, Navigate, Outlet } from "react-router";
import useAuth from "../helpers/hooks/useAuth";
import { authProvider } from "../helpers/authProvider/authProvider";

const RequireAuth=({children})=>{

    const { auth } = useAuth();
    const location = useLocation();

    if( !auth || !auth?.isAuthenticated){
        return (
            <Navigate to={"/login"} state={{from: location}} replace/>
        )
    }
    return children;
}

export default RequireAuth;
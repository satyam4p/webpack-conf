import useAxiosPrivate from "./useAxiosPrivate";
import { useDispatch } from "react-redux";
import { fetchDrawerDetailsBegin, fetchDrawerDetailsSuccess, fetchDrawerDetailsError } from "../../features/Drawer/drawerSlice";
import urlSchema from '../../network/urlSchema/urlSchema.json';

const useDrawerDetails = ()=>{

    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch();

    const fetchDrawerDetails = async (type) =>{

        const strtype = type.split(" ").join("_").toLowerCase();
        dispatch(fetchDrawerDetailsBegin());
            const url = urlSchema.Drawer[strtype];
            const result = await axiosPrivate.get(url);
            if(result && result.data){
                dispatch(fetchDrawerDetailsSuccess(result.data))
            }else{
                dispatch(fetchDrawerDetailsError(result.data));
            }
    }

    return fetchDrawerDetails;

}

export default useDrawerDetails;
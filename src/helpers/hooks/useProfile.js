import { useCallback, useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate"
import urlSchema from '../../network/urlSchema/urlSchema.json';
import { fetchProfileFailed, fetchProfileSuccess, fethcProfileBegin } from "../../features/profile/profileSlice";
import { useDispatch } from "react-redux";

const useProfile = () =>{
    const [profileCallEnded, setprofileCallEnded] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    const url = urlSchema.Profile.GET_PROFILE;
    const dispatch = useDispatch();
    const getUserProfile = useCallback(async ()=>{

        try{
            dispatch(fethcProfileBegin());
            const userProfile = await axiosPrivate.get(url);
            if(userProfile && userProfile.data && userProfile.status === 200){
                dispatch(fetchProfileSuccess(userProfile.data));
            }
        }catch(error){
            dispatch(fetchProfileFailed(error));
            console.log("an error occured while fetching profile:: ",error);
        }
    })
    
    return [getUserProfile, profileCallEnded];   
}
export default useProfile;
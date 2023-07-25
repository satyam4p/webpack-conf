import { useEffect, useState } from "react";
import useProfile from "../../helpers/hooks/useProfile";
import { selectUserProfile, selectStatus, selectError } from "../../features/profile/profileSlice";
import { useSelector } from "react-redux";
import './stylesheet.scss';

const UserProfile = ( props )=>{
    const userProfile = useSelector(selectUserProfile);
    const profileStatus = useSelector(selectStatus);
    const profileError = useSelector(selectError);
    const [getUserProfile, profileCallEnded] = useProfile();
    useEffect(()=>{
       getUserProfile();
    },[profileCallEnded]);

    return(
        <div className="user-profile">
            <div className="user-profile-image-container">
                {userProfile && userProfile.profile ? (
                        <img className="user-profile-image" src={`${userProfile?.profile}`}/>
                ) :
                (
                    <img className="user-profile-image" src={'../../common/images/defaultImage.png'}/>
                )
            }
                
                <h3> {userProfile?.user?.username}</h3>
            </div>
            <div className="profile-content">
                <h4>profile content comes here</h4>
            </div>
            
        </div> 
    )
}   

export default UserProfile;
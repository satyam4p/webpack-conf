import { useNavigate } from "react-router";
import useAuth from "../../../helpers/hooks/useAuth";
import useAxiosPrivate from "../../../helpers/hooks/useAxiosPrivate";
import './stylesheet.scss';
import useTheme from "../../../helpers/hooks/useTheme";
import { Link } from "react-router-dom";

const LOGOUT_URL = 'auth/logout';
const LOGOUT_ALL_URL = 'auth/logoutAll'

const ProfileTogggle =({toggleProfile, setToggleProile})=>{
    const navigate = useNavigate();
    const { auth, setAuth, signOut } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const handlLogout= async (e, type)=>{
       signOut(type)
    }
    const handleProfileToggle = (e)=>{
        e.preventDefault();
        navigate('profile');
        setToggleProile(prev=>!prev);
    }

    const [changeTheme, theme] = useTheme();

    return(
        <div className={`profile-panel-container ${toggleProfile ? 'show' : 'hide'} ${theme === "light" ? "primary" : "secondary"}`}>
                <section className="profile-detail">
                    <section className="profile-image">
                        
                    </section>
                    <section className="profile-username">
                        {auth?.user?.username}
                    </section>
                </section>
                <div classname = "items-container">
                    <div className="profile-item">
                        <button onClick={handleProfileToggle}>Your Profle</button>
                    </div>
                    <div style={{
                            width:'100%',
                            height:'0.8px',
                            background:"#CECECE",
                            alignSelf:'center',
                            margin:'0px',
                        }}/>
                    <div className="profile-item">
                        <button onClick={e=>handlLogout(e)}>Sign Out</button>
                        <button onClick={e=>handlLogout(e, 'all')}>Sign Out All</button>
                    </div>
                </div>
        </div>
    )

}

export default ProfileTogggle;
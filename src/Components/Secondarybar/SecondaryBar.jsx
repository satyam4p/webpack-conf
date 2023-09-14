import iconsMap from '../../common/IconsMapper/IconsMap';
import ProfileTogggle from './Profile/ProfileToggle';
import './stylesheet.scss';
import useTheme from '../../helpers/hooks/useTheme';


function SecondaryBar({ 
    setToggleSideMenu, 
    toggleProfile,
    setToggleProile,
    setToggleAddMenu,
    showSideMenu }){
    
        const [changeTheme, theme] = useTheme();

        return(
            <>
                <div className = {`secondary-bar-container ${theme === "light" ? "" : "secodnary-dark"}`}>
                    <button className='hamburger-btn'
                            onClick={()=>{
                            setToggleSideMenu((prev)=>!prev)
                            setToggleAddMenu(false)
                        }}>
                            <div className={`bar bar1 ${showSideMenu ? 'showSideMenu' : '' }`}/>
                            <div className={`bar bar2 ${showSideMenu ? 'showSideMenu' : '' }`} />
                            <div className={`bar bar3 ${showSideMenu ? 'showSideMenu' : '' }`} />
                    </button>
                    <div className='right-section'>
                        <button className='theme-change-btn' onClick={()=>changeTheme()}>
                            {iconsMap.theme(24)}
                        </button>
                        <button className='profile-btn'
                                onClick={()=>setToggleProile(!toggleProfile)}>
                                
                        </button>

                    </div>
                    
                </div>
                <div className={`profile-backdrop ${toggleProfile ? 'show' : 'hide'}`} onClick={()=>setToggleProile(false)}/>
                <ProfileTogggle toggleProfile={toggleProfile} setToggleProile = {setToggleProile}/>
            </>

        )
}



export default SecondaryBar;
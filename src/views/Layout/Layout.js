import React, { useState,Suspense, useContext } from 'react';
import { Outlet } from 'react-router';
import SecondaryBar from '../../Components/Secondarybar/SecondaryBar';
import SideMenu from '../../Components/SideMenu/SideMenuV2';
// import SideMenu from '../Components/SideMenu/SideMenu';
import useAuth from '../../helpers/hooks/useAuth';
import useModals from '../../helpers/hooks/useModals';
import { TaskProvider } from '../../common/Modals/Task/TaskContext/TaskProvider';
import Notification from '../../common/Notification/Notification';
import ThemeContext from '../../theme/themeContext';
import './stylesheet.scss';

const TaskModal = React.lazy(()=>import('../../common/Modals/Task/TaskModal'));

function Layout(props){
    const { theme } = useContext(ThemeContext);
    const [toggleSideMenu, setToggleSideMenu] = useState(true);
    const { showNotification } = useAuth();
    const [ toggleProfile, setToggleProile ] = useState(false);
    const [ toggleAddMenu, setToggleAddMenu ] = useState(false);
    const { modalType, setModalType } = useModals();

    return(
        <div className={`main-container ${theme}`}>
            <div className='secondary-nav'>
            <SecondaryBar
                    showSideMenu = {toggleSideMenu}
                    setToggleSideMenu = {setToggleSideMenu}
                    setToggleProile = {setToggleProile}
                    toggleProfile = {toggleProfile}
                    setToggleAddMenu = {setToggleAddMenu}
                />
           </div>
            <div className='content-container'>   
                <SideMenu
                    showSideMenu = {toggleSideMenu}
                    toggleAddMenu = {toggleAddMenu}
                    setToggleAddMenu = {setToggleAddMenu}
                />
                <div className={`content ${toggleSideMenu ? '' : 'expand'}`}>
                {
                (modalType.type === 'task' && modalType.isVisible) &&
                    <Suspense fallback={<h4>Loading...</h4>}>
                        <TaskProvider>
                            <TaskModal setModalType = {setModalType}  />
                        </TaskProvider>
                    </Suspense>   
                }
                <Outlet/>
                {/* <div className ="home-backdrop">
                    <h1>Task Board</h1>
                    <h2>
                        Get started with your tasks and collaborate with others.
                    </h2>
                </div> */}
                </div>
            </div>
           
            {showNotification && <Notification/>}
            
           
        </div>
    )

}

export default Layout;


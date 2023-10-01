import Sidebar from "../../common/Sidebar/Sidebar";
import { selectDrawerDetails } from "../../features/Drawer/drawerSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import useDrawerDetails from "../../helpers/hooks/useDrawerDetails";
import shortid from "shortid";
import useActions from "../../helpers/hooks/useActions";
import iconsMap from "../../common/IconsMapper/IconsMap";
import { Link } from "react-router-dom";
import ThemeContext from "../../theme/themeContext";


function SideMenu({showSideMenu, toggleAddMenu, setToggleAddMenu}){
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [isActive, setActive] = useState('board');
    const drawerDetails = useSelector(selectDrawerDetails);
    const fetchDrawerDetails = useDrawerDetails();
    const execute = useActions();
    const handleIndexAction = (type)=>{
        setActive(type)
        if(type !== "board" && type !== "archive" ){
            fetchDrawerDetails(type);
        }else{
            let to = `/${type}`;
            navigate(to, {replace: true});
        }
    }

    const {theme} = useContext(ThemeContext);

    useEffect(()=>{

        if( drawerDetails && drawerDetails.length){
            setTasks(drawerDetails);
        }

    },[drawerDetails]);
    
    return(
        <div className="sidemenu-parent">
        <Sidebar showSideMenu={showSideMenu}>
            <Sidebar.MenuList>
                <Sidebar.MenuIndex id= {'create'} isActive={isActive}>
                    <button 
                        style={{
                            width:'100%', 
                            border:'1px solid #88AF9F', 
                            background:'#6DBF97', 
                            borderRadius:'5px',
                            height:'25px',
                            display:"flex",
                            alignItems:"center",
                            fontSize:'12px',
                            margin:'10px 0px 0px 0px'
                            
                            }} onClick = {()=>execute({action: "create", type: "task"})}>
                        {iconsMap.add()}&nbsp;Create
                    </button>
                </Sidebar.MenuIndex>
                <Sidebar.MenuIndex  id = {"board"} handleIndexAction = {handleIndexAction} isActive = {isActive}>
                    <Link to={"board"}> 
                        <div className="title-container">
                            {iconsMap.board()}&nbsp;Board
                        </div>
                    </Link>
                </Sidebar.MenuIndex>

                <Sidebar.MenuIndex id = {"recent_tasks"} isActive = {isActive} arrowOnHover hasPanel panelData = {tasks} handleIndexAction = {handleIndexAction}>
                    <div className="title-container">
                        {iconsMap.recentTasks()}&nbsp;Recent Tasks
                    </div>
                    
                </Sidebar.MenuIndex>
                <Sidebar.MenuIndex id = {"archive"} isActive = {isActive} handleIndexAction = {handleIndexAction}>
                    <Link to={"archive"}>
                        <div className="title-container">
                            {iconsMap.archive()}&nbsp;Archive
                        </div>
                    </Link>
                </Sidebar.MenuIndex>
                <Sidebar.MenuIndex id = {"settings"} isActive = {isActive}  bottom arrowOnHover hasPanel>
                    <div className="title-container">
                        {iconsMap.settings()}&nbsp;Settings
                    </div>
                </Sidebar.MenuIndex>
            </Sidebar.MenuList>
            <Sidebar.SidePanels id = {"recent_tasks"}>
                    {tasks && tasks.length ? 
                        tasks.map(({status, label, name, _id}, index)=>{
                            const options = {
                                status,
                                label,
                                name,
                                id: _id
                            }
                            return(
                                <Sidebar.SidePanelIndex key={shortid.generate()+index} options = {options}/>
                            )
                        })
                        :
                        null
                    }
            </Sidebar.SidePanels>
            <Sidebar.SidePanels id = {"settings"}>
                    
            </Sidebar.SidePanels>
        </Sidebar>
        </div>
    )

}

export default SideMenu;

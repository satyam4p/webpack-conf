import React,{ useState, useContext, createContext, useEffect } from "react";
import './Stylesheet.scss';
import iconsMap from "../IconsMapper/IconsMap";
import { Tag } from 'antd';
import ModalContext from "../../context/ModalProvider";
import useGetTask from "../../helpers/hooks/useGetTask";
import ThemeContext from "../../theme/themeContext";


const SideMenuContext = createContext();

const useSideMenuContext = ()=> {

    const context = useContext(SideMenuContext);

    if(!context){
        
        throw new Error("Children cannot be rendered outside Sidebar parent component");
    }

    return context;
}


const Sidebar = ({ children, showSideMenu })=>{

    const [activeIndex, setActiveIndex] = useState({});
    const [panel, setPanel] = useState({});
    return(
        <SideMenuContext.Provider value={{activeIndex, setActiveIndex, panel, setPanel}}>
            <div className={`sidemenu-container ${showSideMenu ? 'show' : 'hide'} sidebar`}>
                { children }
            </div>
        </SideMenuContext.Provider>
    )
}

const MenuList = ({children})=>{

    const { activeIndex, setActiveIndex, panel, setPanel} = useSideMenuContext();
    const { theme } = useContext(ThemeContext);
    const onActive = (index, hasPanel, panelData, handleIndexAction, children, id)=>{
        if(typeof handleIndexAction === "function"){
            handleIndexAction(id)
        }
        if(hasPanel && activeIndex?.index !== index){
            setPanel(prev=>{
                return {
                    show: true,
                    index,
                    panelData,
                }
            })
            setActiveIndex({index, id});
            return;
        }else if(hasPanel){
            setPanel(prev=>{
                if(prev?.show){
                    return {
                        ...prev,
                        show:false,
                        index,
                        panelData:[],
                    }
                }else{
                    return {
                        ...prev,
                        show: true,
                        index,
                        panelData,
                    }
                }
            })
        }
        if(panel?.show){
            setPanel(prev=>{
                return {
                    ...prev,
                    index,
                    show: false,
                    panelData:null
                }
            })
        }
        activeIndex?.index === index ? setActiveIndex(null) : setActiveIndex({index, id});
    }

    const Children = React.Children.map( children, (child, index)=>{
        if(child.type === MenuIndex){
            let isActive = child.props.isActive === child.props.id;
            return React.cloneElement( child, { theme, isActive, onActive, index});
        }else{
            return child;
        }
    }) 

    return(
        <div className="sidemenu__list">
            { Children }
        </div>
    )

}

Sidebar.MenuList = MenuList;

const MenuIndex = ({children, isActive, onActive, index, arrowOnHover, 
    hasPanel, panelData, bottom = false, handleIndexAction = undefined, id, theme})=>{
    
    const [arrow, setArrow] = useState(false);
    const showArrow = ()=> arrowOnHover ? arrow ? setArrow(false) : setArrow(true) : null;

    useEffect(()=>{
        if(isActive){
            onActive(index, hasPanel, panelData, handleIndexAction, children, id);
        }
    },[])

    return(
        <div className={`menu__index sidebar-index ${theme === "light" ? "light_index" : "dark_index" } 
            ${isActive ? 'active' : '' } ${bottom ? 'bottom': ''}`}
            onClick={()=>onActive(index, hasPanel, panelData, handleIndexAction, children, id)}
            onMouseOver={()=>showArrow()} 
            onMouseLeave={()=>showArrow()}>

            {children}
            <div>
                {arrow ?iconsMap.doubleRightArror(14) : null}
            </div>
            
        </div>
    )
}

Sidebar.MenuIndex = MenuIndex;

const SidePanels = ({ children, id })=>{
    const { activeIndex, panel } = useSideMenuContext();
    const { setModalType } = useContext(ModalContext);
    const getTask = useGetTask();
    const handleAction = (id)=>{
        setModalType(prev=>{
            if(!prev.isVisible){
                return {
                    isVisible: true,
                    type: 'task'
                }
            }
            return prev;
        });
        getTask(id);
    }

    const Children = React.Children.map(children, (child, index)=>{
        if(child.type === SidePanelIndex){
            return React.cloneElement(child, { handleAction })
        }
        return child;
    })

    return(
        <div className={`sidemenu__sidePanels ${ activeIndex?.index && activeIndex?.id === id && panel.show ? 'show' : 'hide'} sidebar`}>
            { Children }
        </div>
    )
}

Sidebar.SidePanels = SidePanels;

const SidePanelIndex = ({ children, handleAction, options })=>{
    if(options){
        return (
            <div className={`sidemenu__sidepanel sidebar-index`} onClick = {()=>handleAction(options?.id)}>
            <div className='sidepanel_index_tag-container'>
                <Tag className={`sidepanel_index_status-tag ${options?.status.trim().toLowerCase().split(" ").join("_")}`} >{options?.status}</Tag>
                <Tag className={`sidepanel_index_label-tag ${options?.label.trim().toLowerCase().split(" ").join("_").trim()}`} >{options?.label}</Tag>
            </div>
            <span className='sidepanel_index_title-container'>{options?.name}</span>
            { children }
        </div>    
        )
    }
    return(
        <div>
            {children}
        </div>
    )

}

Sidebar.SidePanelIndex = SidePanelIndex;


export default Sidebar;
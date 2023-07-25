/** @jsxImportSource theme-ui */
import { Flex, } from 'theme-ui';
import AddDrawer from '../../common/AddDrawer/AddDrawer';
import { useDispatch } from "react-redux";
import Popover from '../Popover/Popover';
import { CarryOutOutlined,
        FundOutlined,
        FileZipOutlined,
        SettingOutlined,
        PlusSquareOutlined    
    } from '@ant-design/icons';
import iconsMap from '../../common/IconsMapper/IconsMap';
import { useState } from 'react';
import useAxiosPrivate from '../../helpers/hooks/useAxiosPrivate';
import urlSchema from '../../network/urlSchema/urlSchema.json';
import { fetchDrawerDetailsBegin, fetchDrawerDetailsSuccess, fetchDrawerDetailsError } from '../../features/Drawer/drawerSlice';

const actions = [
    {
        type: 'task',
        label: 'Create New Task',
        action: 'create'
    },
    {
        type: 'Story',
        action: 'create',
        label: 'Create New Story'
    }
]



function SideMenu({showSideMenu, toggleAddMenu, setToggleAddMenu}){

    const [hoverStyle, setHoverStyle] = useState({display:'none'});
    const [ showDrawer, setDrawer] = useState(false);
    const axios = useAxiosPrivate();
    const addDrawer = ()=>{
        
        return <AddDrawer showDrawer = {showDrawer} showSideMenu = {showSideMenu}/>
    }
    const dispatch = useDispatch();
    const handleMenuAction = async (type)=>{
        if(showDrawer){
            setDrawer(prev=>!prev);
        }else{
            setDrawer(prev=>!prev);
            dispatch(fetchDrawerDetailsBegin());
            const url = urlSchema.Drawer[type];
            const result = await axios.get(url);
            if(result && result.data){
                dispatch(fetchDrawerDetailsSuccess(result.data))
            }else{
                dispatch(fetchDrawerDetailsError(result.data));
            }
        }
    }

    return(
        <>
        <Flex sx={{
                width:'12%',
                height:'86vh',
                top:`calc(100vh - 89vh)`,
                position:'absolute',
                display:'block',
                bg:'#F6F6F6',
                fontFamily:'body',
                fontSize:2,
                transform:()=> showSideMenu ? 'translateX(0%)' : 'translateX(-150%)',
                transition:'all 0.3s',
                zIndex:'100'
            }}>
            <Flex sx={{
                    flexDirection:'column',
                    py:'10px',
                    display:'flex',
                    justifyContent:'space-between',
                    height:'inherit',
            }}>
                <Flex sx={{
                    flexDirection:'column',
                }}>
                    <button sx={{
                            width:'25px',
                            height:'25px',
                            background:'transparent',
                            borderRadius:'20%',
                            border:'none',
                            alignSelf:'end',
                            padding:0,
                            margin:0,
                        }}
                        onClick={()=>setToggleAddMenu(!toggleAddMenu)}
                        >
                            {<PlusSquareOutlined style={{
                                fontSize:'18px'
                            }}/>}
                        </button>
                        {
                            toggleAddMenu && 
                            <Popover 
                                actions={actions}
                                setToggleAddMenu={setToggleAddMenu} 
                            />
                        }
                    <div sx={{
                        width:'85%',
                        mx:'2px',
                        my:'2px',
                        alignSelf:'center',
                    }}>
                        <button
                            onMouseEnter= {()=>setHoverStyle({display:'block'})}
                            onMouseLeave= {()=>setHoverStyle({display:'none'})}
                            onClick={()=>handleMenuAction('recent_tasks')}
                            sx={{
                                width:'100%',
                                height:'inherit',
                                border:'none',
                                borderRadius:'5px',
                                bg:'transparent',
                                margin:0,
                                padding:'4px',
                                textAlign:'left',
                                alignSelf:'center',
                                '&:hover':{
                                    bg:'#DFDFDF',
                                    cursor:'pointer'
                                },
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'space-between'
                            }}>
                                <div>
                                    {<CarryOutOutlined style={{
                                            fontSize:'12px'
                                        }}/>}&nbsp;Recent Tasks
                                </div>
                                <span style={hoverStyle}>{iconsMap.doubleRightArror(12)}</span>
                        </button>
                    </div>
                    <div sx={{
                        width:'85%',
                        mx:'2px',
                        my:'2px',
                        alignSelf:'center'
                    }}>
                        <button
                             sx={{
                                width:'100%',
                                height:'inherit',
                                border:'none',
                                borderRadius:'5px',
                                bg:'transparent',
                                margin:0,
                                padding:'4px',
                                textAlign:'left',
                                alignSelf:'center',
                                '&:hover':{
                                    bg:'#DFDFDF',
                                    cursor:'pointer'
                                },
                                display:'flex',
                                alignItems:'center',
                            }}>{<FundOutlined style={{
                                fontSize:'12px'
                            }}/>}&nbsp;Board</button>
                    </div>
                    <div sx={{
                        width:'85%',
                        mx:'2px',
                        my:'2px',
                        alignSelf:'center'
                    }}>
                        <button
                             sx={{
                                width:'100%',
                                height:'inherit',
                                border:'none',
                                borderRadius:'5px',
                                bg:'transparent',
                                margin:0,
                                padding:'4px',
                                textAlign:'left',
                                alignSelf:'center',
                                '&:hover':{
                                    bg:'#DFDFDF',
                                    cursor:'pointer'
                                },
                                display:'flex',
                                alignItems:'center',
                            }}>{<FileZipOutlined style={{
                                fontSize:'12px'
                            }}/>}&nbsp;Archive</button>
                    </div>
                    <div sx={{
                        width:'85%',
                        height:'0.8px',
                        bg:"#CECECE",
                        alignSelf:'center',
                        padding:0,
                    }}/>
                </Flex>
                <div sx={{
                    width:'85%',
                    mx:'10px',
                    my:'10px',
                    alignSelf:'center'
                }}>
                    <button
                        // onMouseEnter= {()=>setHoverStyle({display:'block'})}
                        // onMouseLeave= {()=>setHoverStyle({display:'none'})}
                         sx={{
                            width:'100%',
                            height:'inherit',
                            border:'none',
                            borderRadius:'5px',
                            bg:'transparent',
                            margin:0,
                            padding:'4px',
                            textAlign:'left',
                            alignSelf:'center',
                            '&:hover':{
                                bg:'#DFDFDF',
                                cursor:'pointer'
                            },
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'space-between'
                        }}>
                            <div>
                            {<SettingOutlined style={{
                                fontSize:'12px'
                                }}/>}&nbsp;Settings
                            </div>
                            {/* <span style={hoverStyle}>{iconsMap.doubleRightArror(16)}</span> */}
                    </button>
                </div>
            </Flex>
        </Flex>
        {addDrawer()}
        </>
    )


}

export default SideMenu;

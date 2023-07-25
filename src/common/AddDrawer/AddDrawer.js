import React, { useState, useEffect, useContext } from 'react';
import { Tag } from 'antd';
import DrawerLoader from './loader/DrawerLoader';
import { useSelector } from "react-redux";
import { Input } from 'antd';
import debounce from '../../helpers/commonUtils/debounce';
import shortId from 'shortid';
import ModalContext from '../../context/ModalProvider';
/** custom style */
import './stylesheet.scss';
import { selectDrawerDetails, selectDrawerStatus } from '../../features/Drawer/drawerSlice';
import useGetTask from '../../helpers/hooks/useGetTask';

const {Search} = Input;
const Record = ({title, status, label, context}) => {

    const { setModalType } = useContext(ModalContext);
    const getTask = useGetTask();

    const handleRecordAction=(e)=>{
        e.preventDefault();
        setModalType(prev=>{
            if(!prev.isVisible){
                return {
                    isVisible: true,
                    type: 'task'
                }
            }
            return prev;
        });
        getTask(context?._id);

    }

    return(
        <div className='record-Container' onClick={handleRecordAction}>
            <div className='tag-container'>
                <Tag className={`status-tag ${status.toLowerCase().split(" ").join("_")}`} >{status}</Tag>
                <Tag className={`label-tag ${label.toLowerCase().split(" ").join("_")}`} >{label}</Tag>
            </div>
            
            <span className='title-container'>{title}</span>
        </div>
    ) 

}

const AddDrawer = ({showDrawer, config, showSideMenu})=>{

    const drawerStatus = useSelector(selectDrawerStatus);
    const drawerDetails = useSelector(selectDrawerDetails);
    const titles = drawerDetails && drawerDetails.length ? drawerDetails.map(detail=>detail.name) : [];
    const [tasks, setTasks] = useState([]);
    useEffect(()=>{

        if(drawerDetails && drawerDetails.length){
            setTasks(drawerDetails);
        }

    },[drawerDetails])

    const handleSearch =(value)=>{

        const search = value;
        const trimValue = search.trim();
        if(trimValue.length < 1){
            setTasks(drawerDetails);
            return;
        }else{
            if(titles && titles.length){
                let searchedResult = drawerDetails.filter(task=>{
                    const name = task?.name.toLowerCase();
                    if(name.includes(search.toLowerCase())){
                        return task;
                    }
                    return [];
                });
                setTasks(searchedResult);
            }
        }    

    }
    const handleChange =(event)=>{
        const search = event.target.value;
        const trimValue = search.trim();
        if(trimValue.length < 1){
            setTasks(drawerDetails);
            return;
        }else{
            if(titles && titles.length){
                let searchedResult = drawerDetails.filter(task=>{
                    const name = task?.name.toLowerCase();
                    if(name.includes(search.toLowerCase())){
                        return task;
                    }
                    return [];
                });
                setTasks(searchedResult);
            }
        }        
    }

    return(
        <div className={`drawer-container ${showDrawer ? 'show' : 'hide'} ${showSideMenu ? 'showSideMenu' : ""}` }>
            <div className='search-container'>
                <Search 
                    className='antd-search' 
                    placeholder='Search recent task'
                    onChange={debounce(handleChange, 400)}    
                    onSearch = { handleSearch }
                />
            </div>
            <div className='break'/>
            {drawerStatus === 'succeeded' ? 
                tasks && tasks.length ? tasks.map((data,key)=>{
                    return <Record 
                        key={shortId.generate()} 
                        status={data?.status} 
                        title = {data?.name}
                        label = {data?.label}
                        context = {data} 
                    />
                })
                :
                <span className='no-result'> No Results found</span>
            : <DrawerLoader/>
        }
        </div>
    )
}

export default AddDrawer;
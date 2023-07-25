import React from 'react';
import './stylesheet.scss'
import { Typography } from 'antd'; 
import Header from '../Columns/Header/Header';

const ToggleTrigger = ({collapse, setCollapse, user}) =>{
    const handleToggle=()=>{
        setCollapse(prevCollapse=>{
            return !prevCollapse;
        })
    }
    return(
        <div className={`toggle-container collapse-${collapse}`}>
            <div>
                <span className={`toggle-arrow collapse-${collapse}`} onClick={handleToggle}>
                    <span></span>
                    <span></span>
                </span>
            </div>
            
            <Header name={user} level={4} style="no-margin"/>
        </div>
    )
}

export default ToggleTrigger;
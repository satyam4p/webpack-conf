import React, { useState } from "react";
import shortid from "shortid";
import iconsMap from "../../../IconsMapper/IconsMap";
import './stylesheet.scss';
import useTheme from '../../../../helpers/hooks/useTheme';


const MoreOptions = ({handleMoreAction, currentTaskStatus})=>{

    const options = ["Archive", "Delete Task", "Save and Exit"]
    const [changeTheme, theme] = useTheme();
    return(
    <div className={`more-options-container ${theme === 'light' ? 'bg-light' : 'bg-dark'}`}>
       {options.map((option, index)=>{
        return (
            <button disabled= {currentTaskStatus && currentTaskStatus !== "succeeded"} className = "options-index" key={shortid.generate()+index} onClick={(e)=>handleMoreAction(e, option)} >
                {option}
            </button>
        )
       })}
    </div>)

}

const TaskActionBar = ({currentTaskStatus, handleClose, handleEdit, handleShare, editEnabled, handleMoreAction}) => {

    const [showMore, setMore] = useState(false);
    const handleMore =(e)=>{
        e.preventDefault();
        setMore(!showMore);
    }


    return(
        <div className="actions-container">
            <div className="icons-container">
                <button className="icon" type="submit" disabled={!editEnabled}> 
                { currentTaskStatus === "loading" 
                    ? <span style={{color:'green'}}>Creating...{iconsMap.loading(18)}</span> 
                    : editEnabled && currentTaskStatus !== "succeeded" ? iconsMap.create(18) : iconsMap.save(18) } 
                </button>
            </div>
            <div className="icons-container">
                <button className="icon" sx={{
                    background:'transparent',
                    border:'none'
                }}
                onClick={(e)=>handleShare(e)}
                >
                    {iconsMap.share(18)}
                </button>
            </div>
            <div className="icons-container">
                <button 
                    className="icon"
                    onClick={e=>handleEdit(e)}
                    sx={{
                        background:'transparent',
                        border:'none'
                    }}>
                        {iconsMap.edit(editEnabled, 18)}
                </button>
            </div>
            <div className="icons-container">
                <button
                    className="icon"
                    onClick={e=>handleMore(e)}
                    sx={{
                    background:'transparent',
                    border:'none'
                    }}>
                    {iconsMap.more(18, 800, showMore)}
                </button>
                { showMore ? <MoreOptions handleMoreAction = {handleMoreAction} currentTaskStatus = {currentTaskStatus}/> : null}
            </div>
            <div className="icons-container"
                onClick={(e)=>handleClose(e)}>
                    <button 
                    className="icon"
                    onClick={e=>handleEdit(e)}
                    sx={{
                        background:'transparent',
                        border:'none'
                    }}>
                        {iconsMap.close(18)}
                </button>
               
            </div>
        </div>
    )

}


export default TaskActionBar;
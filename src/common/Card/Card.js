import React, { useState } from 'react';
import './stylesheet.scss';
import { Card as AntCard } from 'antd';

const Card=(props)=>{

    const [hoverElement, setHoverElement] = useState(false); 

    console.log("hover element: ",hoverElement);
    return(
        <div>
            <AntCard.Meta
                className = {`ant-card-meta ${hoverElement ? 'hover' : '' }`}
                onMouseOver={(event)=>{
                    event.preventDefault();
                    setHoverElement(true);
                }}
                onMouseLeave={(event)=>{
                    event.preventDefault();
                    setHoverElement(false);
                }}
                draggable={true}
                title={ props.task.name}
                onDragStart={e=>{
                    e.dataTransfer.setData("taskID", props.task.id);
                    e.dataTransfer.setData("fromCol", props.task.status);
                }}
                onDragOver={e=>e.preventDefault}
            />
        </div>
    )
}

export default Card;
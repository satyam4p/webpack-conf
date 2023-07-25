import React, { createContext, useContext, useState } from 'react';

import './stylesheet.scss';


const TooltipContext = createContext();

const useTooltipContext = ()=>{

    const context = useContext(TooltipContext);

    if(!context){
        throw new Error("Child component cnnot be rendered outside Tooltip");
    }

    return context;

}


const Tooltip=({children})=>{
    const [text, setText] = useState('');  
    return(
        <TooltipContext.Provider value={{text, setText}}>
            <div className='tooltip-container'>
                {children}
            </div>
        </TooltipContext.Provider>
    )

}

const Content = ({children}) =>{
    const {text} = useTooltipContext();
    return(
        <p className='tooltip-text'>
            {text}
        </p>
    )
}

Tooltip.Content = Content;



export default Tooltip;
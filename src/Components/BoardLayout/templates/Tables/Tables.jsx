import React from "react";
import './stylesheet.scss';

const Tables = ({ children }) =>{

    return(
        <div className="table-layout">
            {children}
        </div>
    )

}


export default Tables;
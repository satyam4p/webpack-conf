import React from "react";
import './stylesheet.scss';

const Columns = ({children}) =>{


    return(
        <div className="columns-container">
            {children}
        </div>
    )

}

export default Columns;
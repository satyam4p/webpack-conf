import React, { createContext, useContext, useState } from "react";
import shortid from "shortid";
import './stylesheet.scss';

const SettingsContext = createContext();


const useSettingsContext = ()=>{

    const context = useContext(SettingsContext);

    if(!context){
        throw new Error("Children can't be rendered outsde settings component");
    }

    return context;
}

const titlesArray = ['Security', 'Task Config', 'Theme', 'Roles & Permissions']

const Settings=({ children, settingsToggle })=>{

    const [titles, setTitles] = useState(titlesArray);

    return(
        <SettingsContext.Provider value={{titles, setTitles}}>
            <div className={`settings-container ${settingsToggle ? 'show' : ''}`}>
                {children}
            </div>
        </SettingsContext.Provider>
    )
}

const Menu=({ children })=>{

    return(
        <div className="settings-menu">   
            {children}
        </div>
    )
}

const Titles = ()=>{

    const { titles } = useSettingsContext();

    return(
        titles.map((title, index)=>{
            return(
                <div className="settings-title" key = {shortid.generate()}>
                    {title}
                </div>
            )
        })
    )
}

Settings.Titles = Titles;

Settings.Menu = Menu;

export default Settings;
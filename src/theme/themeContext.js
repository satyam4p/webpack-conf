import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext({});

export const ThemeProvider = ({children}) => {

    const [theme, setTheme] = useState();

    useEffect(()=>{

        const currentTheme = window.localStorage.getItem("taskboard-theme");
        if(currentTheme){
            setTheme(currentTheme);
        }else{
            setTheme("light");
        }
        

    },[theme, setTheme]);

    return(
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext;
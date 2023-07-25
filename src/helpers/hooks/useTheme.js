import ThemeContext from "../../theme/themeContext";
import { useContext } from "react";

const useTheme = ()=>{

    const { theme, setTheme } = useContext( ThemeContext );

    const changeTheme = () =>{

        setTheme(prev=>{

            if(prev === "light"){
                window.localStorage.setItem("taskboard-theme", "dark");
                return "dark";
            }
            window.localStorage.setItem("taskboard-theme", "light");
            return "light";

        });

    }
    return [changeTheme, theme];
}

export default useTheme;
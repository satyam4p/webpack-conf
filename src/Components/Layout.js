import { Outlet } from "react-router";
import SideMenu from "./SideMenu/SideMenuV2";
import SecondaryBar from "./Secondarybar/SecondaryBar";


const Layout=()=>{
    return(
        <main className="App">
            <SideMenu
                showSideMenu = {true}
                toggleAddMenu = {true}
            />
            <SecondaryBar
                showSideMenu = {true}
                toggleAddMenu = {true}
                toggleProfile = {false}
            />
            <Outlet/>
        </main>
    )
}

export default Layout;
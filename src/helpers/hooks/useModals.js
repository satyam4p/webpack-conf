import ModalContext from "../../context/ModalProvider";
import { useContext } from "react";

const useModals = ()=>{
    return useContext(ModalContext);
}

export default useModals;
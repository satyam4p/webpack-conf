import { createContext, useState } from "react";

const ModalContext = createContext({});

export const ModalProvider =({children})=>{

    const [modalType, setModalType] = useState({
        isVisible:false,
        type: null
    });
    return(
        <ModalContext.Provider value={{ modalType, setModalType }} >
            { children }
        </ModalContext.Provider>
    )
}

export default ModalContext;
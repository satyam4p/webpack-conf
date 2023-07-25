import useModals from './useModals';


const useActions=()=>{
    const { setModalType } = useModals();
    const execute=({type, action})=>{
        switch (action){
            case 'create':
                setModalType((prevModal)=>{
                    if(prevModal.type !== type){
                        return{
                            isVisible: true,
                            type: type    
                        }
                    }
                    return {
                        isVisible: !prevModal.isVisible,
                        type
                    }
                });
                break;
            default:
                return;
        }
    }
    return execute;
}

export default useActions;

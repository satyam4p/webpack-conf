import useAxiosPrivate from "./useAxiosPrivate";
import urlSchema from '../../network/urlSchema/urlSchema.json';


const useSaveTransaction = ()=>{

    const axiosPrivate = useAxiosPrivate();

    const saveTransaction = async (payload, path, id)=>{
        const URL = urlSchema.Tasks.PATCH_TASK.replace(':id', id);
        const reqPayload = {
             [path]: payload
        }
        try{
            await axiosPrivate.patch(URL, reqPayload);
        }catch(error){
            console.log("could not synchronise the board data:: ",error);
        }
    }
    return saveTransaction;
}

export default useSaveTransaction;
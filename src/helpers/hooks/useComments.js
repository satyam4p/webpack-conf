import useAxiosPrivate from "./useAxiosPrivate"
import urlSchema from '../../network/urlSchema/urlSchema.json';
import { useDispatch } from "react-redux";
import { postCommentBegin, postCommentSuccess, postCommentError } from "../../features/task/taskSlice";



const useComments =()=>{

    const dispatch = useDispatch();
    const axios = useAxiosPrivate();


    const post = async ( payload ) => {
        
        const URL = urlSchema.Commnets.POST_COMMENT;
        try{
            dispatch(postCommentBegin);
            const result = await axios.post(URL, payload);
            if(result && result.data && result.data.comment){
                dispatch(postCommentSuccess(result.data.comment));
                /** @Todo dispath the post success action and also update the current task with same commnet */ 
            }
        }catch(error){
            dispatch(postCommentError(error));
            console.log("an error occured while posting comment: ",error);
        }
        
    }

    // const deleteComment = async () => {

    // }

    return post;
}

export default useComments;
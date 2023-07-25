
import './stylesheet.scss';
const CommentsSkeleton =()=>{

    const SmallBar = ()=>{
        return (
            <div className="small-bar-loader">

            </div>
        )
    }

    const MediumBar=()=>{
        return(
            <div className="medium-bar-loader">

            </div>
        )
    }
    const LongBar =()=>{
        return(
            <div className="long-bar-loader">

            </div>
        )
    }

    const Profile =()=>{
        return (
            <div className="profile-loader">

            </div>
        )    
    }

    return (
        <div>
            <div className='profile-container'>
                <Profile/>
                <SmallBar/>
            </div>
            <MediumBar/>
            <LongBar/>
        </div>
    )
}

export default CommentsSkeleton;
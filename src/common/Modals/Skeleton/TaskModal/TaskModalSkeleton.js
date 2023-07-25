import './stylesheet.scss'

const TaskModalSkeleton = ()=>{

    const Header = ()=>{
        return (
            <div className="header-loader">

            </div>
        )
    }
    const SmallBar = ()=>{
        return (
            <div className='small-field-bar'>

            </div>
        )
    }

    const MediumBar = ()=>{
        return (
            <div className='medium-field-bar'>

            </div>
        )
    }

    const Feilds = ()=>{
        return (
            <div className="field-loader">
                <div className='bar-container'>
                    <SmallBar/>
                    <SmallBar/>
                </div>
                <div className='bar-container'>
                    <SmallBar/>
                    <SmallBar/>
                </div>
                <div className='bar-container'>
                    <SmallBar/>
                    <SmallBar/>
                </div>
                <div className='bar-container'>
                    <SmallBar/>
                    <SmallBar/>
                </div>
            </div>
        )
    }

    return (
        <div className='skeleton-loader'>
            <Header/>
            <Feilds/>
            <MediumBar/>
            <MediumBar/>
        </div>
    )

}


export default TaskModalSkeleton;
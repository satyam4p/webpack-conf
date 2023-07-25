
import './stylesheet.scss';

const DrawerLoader = () =>{


    const SmallBar = ({size})=>{

        const barArray  = new Array(size).fill(0);
        return barArray.map((bar, key)=>{
            return (
                <div className='bar-container'>
                    <div className='profile-span'></div>
                    <div className='small-bar'></div>
                </div>
            )
        });   

    }

    const MediumBar = ({size})=>{

        const barArray  = new Array(size).fill(0);
        return barArray.map((bar, key)=>{
            return (
                <div className='bar-container'>
                    <div className='profile-span'></div>
                    <div className='medium-bar'></div>
                </div>
                   
                )
        })
       
    }

    return (
        <div className='drawer-loader-container'>
            <SmallBar size = {3}/>
            <MediumBar size={4}/>
            <SmallBar size={2} />
        </div>
    )
}

export default DrawerLoader;
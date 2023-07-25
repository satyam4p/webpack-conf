/** @jsxImportSource theme-ui */
import React from "react";
import useActions from "../../helpers/hooks/useActions";

const Popover=( { actions, setToggleAddMenu } )=>{
    const execute = useActions();
    const handleAction=(action)=>{
        execute(action);
        setToggleAddMenu(false);
    }
    return actions.length > 0 ? (
        <div sx={{
            display:'flex',
            flexDirection:'column',
            minWidth:'80%',
            position:'absolute',
            zIndex:'100',
            left:'calc(100%)',
            background:'#CAD8D0',
            alignItems:'flex-start',
            justifyContent:'left',
            borderRadius:'4px',
            '&::before':{
                content:'""'
            }
        }}>
            <ul sx={{
                px:'10px',
                listStyle:'none',
                fontSize:0
            }}>
                {actions.map(( action,key )=>{

                    return(
                        <button 
                        key={key} 
                        sx={{
                            width:'100%',
                            height:'inherit',
                            border:'none',
                            borderRadius:'5px',
                            bg:'transparent',
                            margin:0,
                            padding:'8px',
                            textAlign:'left',
                            alignSelf:'center',
                            '&:hover':{
                                cursor:'pointer',
                                color:'#014421'
                            },
                            display:'flex',
                            alignItems:'center',
                        }}
                        onClick={e=>handleAction(action)}
                        >
                            {action.label}
                        </button>
                    );
                })}
            </ul>
        </div>
        )
     : null
}

export default Popover;
import React from "react";
import iconsMap from "../../../common/IconsMapper/IconsMap";
import './stylesheet.scss';
import { Input } from 'antd';
import debounce from "../../../helpers/commonUtils/debounce";


const {Search} = Input;

const BoardActions = ({children})=>{

    const handleSearch =(value)=>{


    }

    const handleChange =(e)=>{


    }

    return(

        <div className="board-actions-container">
            <div className="actions">
                <Search 
                    className='antd-search-field' 
                    placeholder='Search Task'
                    onChange={debounce(handleChange, 400)}
                    onSearch = { handleSearch }
                />
                <button>
                   {iconsMap.filter(20)}
                </button>
                <button>
                   {iconsMap.more(20)}
                </button>
            </div>

        </div>

    )

}

export default BoardActions;
import React from 'react';
import { Typography }  from 'antd';
import './stylesheet.scss';

const { Title } = Typography;


const Header = ({name, level, style})=>{

    return(
        <Title className={style} level={level}>{name}</Title>
    )
}

export default Header;
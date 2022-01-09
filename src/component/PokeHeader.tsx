import { Button, PageHeader, PageHeaderProps } from 'antd';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import icon from '../img/pokeball-icon-c.png';

const PokeHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const optionalHeader: PageHeaderProps = {};
    if (location.pathname !== "/") optionalHeader.onBack = () => { navigate(`/`) };

    return (
        <PageHeader
            className='poke-header'
            title={"Pokemon"}
            extra={
                <img src={icon} alt={"My poke"} className='pokeball-header' onClick={() => { navigate(`/myPoke`) }}/>
            }
            {...optionalHeader}
        />
    );
}

export default PokeHeader;

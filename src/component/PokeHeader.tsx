import React from 'react';
import { PageHeader, PageHeaderProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import icon from '../img/pokeball-icon-c.png';
import { useNewPokemonContext } from '../context/MyPokemonContext';

const PokeHeader = () => {
    const { isNew, setIsNew } = useNewPokemonContext();
    const navigate = useNavigate();
    const location = useLocation();

    const optionalHeader: PageHeaderProps = {};
    if (location.pathname !== "/") optionalHeader.onBack = () => { navigate(`/`) };

    const goToMyPoke = () => {
        setIsNew(false);
        navigate(`/myPoke`);
    }

    return (
        <PageHeader
            className='poke-header'
            title={"Pokemon"}
            extra={
                <img src={icon} alt={"My poke"} className={`pokeball-header ${isNew ? 'new' : ''}`} onClick={() => { goToMyPoke() }} />
            }
            {...optionalHeader}
        />
    );
}

export default PokeHeader;

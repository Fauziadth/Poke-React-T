import React from 'react';
import { Row } from 'antd';
import loadingIcon from '../img/pokeball-icon.png'

const Loading = () => {
    return (
        <Row justify='center'>
            <img src={loadingIcon} className="poke-loading" alt="loading"/>
        </Row>
    );
}

export default Loading;

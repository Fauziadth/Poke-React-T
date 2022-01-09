import React from 'react';
import { Progress } from 'antd';

interface StatusProps {
    value: number
}

const StatusBar = ({ value }: StatusProps) => {
    return (
        <Progress percent={100 * (value / 255)} showInfo={false}/>
    );
}

export default StatusBar;

import React from 'react';
import { Col, Progress, Row } from 'antd';
import { statsInt } from '../services/pokeapi';

interface StatusProps {
    stats: statsInt
}

const StatusBar = ({ stats }: StatusProps) => {
    return (
        <Row gutter={6}>
            <Col span={6}>
                {stats.stat.name}
            </Col>
            <Col span={16}>
                <Progress percent={100 * (stats.base_stat / 255)} showInfo={false} />
            </Col>
            <Col span={2}>
                {stats.base_stat}
            </Col>
        </Row>
    );
}

export default StatusBar;

import React from 'react';
import { Button, Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { usePokemonContext } from '../../context/MyPokemonContext';
import { capitalizeName } from '../../utils/utlis';

const MyPoke = () => {
    const navigate = useNavigate();
    const { pokemon, setPokemon } = usePokemonContext();
    const releasePokemon = (idx: number) => {
        setPokemon(pokemon.filter((p, i) => i !== idx));
    }
    const goto = (name: string) => {
        navigate(`/${name}`);
    }

    if (pokemon.length === 0) return (
        <Row justify='center'>
            <h2>
                You don't have any pokemon
            </h2>
        </Row>
    )

    return (
        <Row gutter={[16, 16]} style={{ padding: "20px" }}>
            {pokemon.map((poke, i) => {
                return (
                    <Col key={i} className="gutter-row" xs={24} sm={12} md={6}>
                        <Card key={i} className="poke-card">
                            <img src={poke.img} alt={poke.name} />
                            <h3 className='poke-name'>{`${poke.nickname} (${capitalizeName(poke.name)})`}</h3>
                            <Button onClick={() => { releasePokemon(i) }}>
                                Release
                            </Button>
                            <Button onClick={() => { goto(poke.name) }}>
                                Catch More
                            </Button>
                        </Card>
                    </Col>
                )
            })}
        </Row>
    );
}

export default MyPoke;

import React, { Fragment } from 'react';
import { Button, Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { myPokemonInt, usePokemonContext } from '../../context/MyPokemonContext';
import { capitalizeName } from '../../utils/utlis';

interface MyPokeItemProps {
    poke: myPokemonInt
    onRelease: () => void
    onClickGo: (s: string) => void
}

const MyPokeItem = ({ poke, onRelease, onClickGo }: MyPokeItemProps) => {
    return (
        <Col className="gutter-row" xs={24} sm={12} md={6}>
            <Card className="poke-card">
                <img src={poke.img} alt={poke.name} />
                <h3 className='poke-name'>{`${poke.nickname} (${capitalizeName(poke.name)})`}</h3>
                <Button onClick={() => { onRelease() }}>
                    Release
                </Button>
                <Button onClick={() => { onClickGo(poke.name) }}>
                    Catch More
                </Button>
            </Card>
        </Col>
    )
}

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
        <Fragment>
            <Row style={{marginTop : "10px"}} justify='center'>
                <h2>My Pokemon List</h2>
            </Row>
            <Row gutter={[16, 16]} style={{ padding: "20px" }}>
                {pokemon.map((poke, i) => {
                    return (
                        <MyPokeItem key={i} poke={poke} onRelease={() => { releasePokemon(i) }} onClickGo={goto} />
                    )
                })}
            </Row>
        </Fragment>
    );
}

export default MyPoke;

import { Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../component/Loading';
import pokeapi, { getPoke, getPokeResult } from '../../services/pokeapi';
import { capitalizeName } from '../../utils/utlis';

const PokeList = () => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [pokemonList, setPokemonList] = useState<Array<getPokeResult>>([]);
    const navigate = useNavigate();

    const goto = (name: string) => {
        navigate(`/${name}`);
    }

    useEffect(() => {
        pokeapi.getPokemonList(151, 0)
            .then(res => {
                const pokemon: getPoke = res.data.pokemons;
                setPokemonList(pokemon.results);
                setLoading(false);
            })

    }, [])

    if (isLoading) return <Loading />;

    return (
        <Row gutter={[16, 16]} style={{padding : "20px"}}>
            {pokemonList.map(poke => {
                return (
                    <Col key={poke.id} className="gutter-row" xs={24} sm={12} md={6}>
                        <Card key={poke.id} className="poke-card clickable" onClick={() => { goto(poke.name) }}>
                            <img src={poke.image} alt={`${poke.name}`} />
                            <h3 className='poke-name'>{capitalizeName(poke.name)}</h3>
                        </Card>
                    </Col>
                )
            })}
        </Row>
    );
}

export default PokeList;

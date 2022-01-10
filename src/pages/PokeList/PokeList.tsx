import { Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../component/Loading';
import pokeapi, { getPoke, getPokeResult } from '../../services/pokeapi';
import { capitalizeName } from '../../utils/utlis';

interface PokeListItemProps {
    poke: getPokeResult
    onClick: (s: string) => void
}

const PokeListItem = ({ poke, onClick }: PokeListItemProps) => {
    return (
        <Col className="gutter-row" xs={24} sm={12} md={6}>
            <Card className="poke-card clickable" onClick={() => { onClick(poke.name) }}>
                <img src={poke.image} alt={`${poke.name}`} />
                <h3 className='poke-name'>{capitalizeName(poke.name)}</h3>
            </Card>
        </Col>
    )
}

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
        <Row gutter={[16, 16]} style={{ padding: "20px" }}>
            {pokemonList.map(poke => {
                return (
                    <PokeListItem key={poke.id} poke={poke} onClick={goto}/>
                )
            })}
        </Row>
    );
}

export default PokeList;

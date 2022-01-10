import { Button, Card, Col, Row } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../component/Loading';
import pokeapi, { getPoke, getPokeResult } from '../../services/pokeapi';
import { capitalizeName } from '../../utils/utlis';

//Only take gen 1 for now
const maxPokemonNumber = 151;
const pageLimit = 20;

const getDynamicPageLimit = (page : number) => {
    let remains = maxPokemonNumber - ((page - 1) * pageLimit);
    if (remains > pageLimit) return pageLimit;
    else return remains;
}

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
    const [isLoading, setLoading] = useState<boolean>(false);
    const [pokemonList, setPokemonList] = useState<Array<getPokeResult>>([]);
    const [page, setPage] = useState<number>(1);
    const [haveMore, setHaveMore] = useState<boolean>(false);
    const navigate = useNavigate();

    const goto = (name: string) => {
        navigate(`/${name}`);
    }

    const loadPokemon = () => {
        setLoading(true);
        pokeapi.getPokemonList(getDynamicPageLimit(page), pageLimit * (page - 1))
            .then(res => {
                const pokemon: getPoke = res.data.pokemons;
                const newList: Array<getPokeResult> = [...pokemonList, ...pokemon.results];
                setPokemonList(newList);
                setPage(page + 1);
                setHaveMore(newList.length + 1 < maxPokemonNumber)
                setLoading(false);
            })
    }

    useEffect(() => {
        loadPokemon();
    }, []);

    return (
        <Fragment>
            <Row gutter={[16, 16]} style={{ padding: "20px" }}>
                {pokemonList.map(poke => {
                    return (
                        <PokeListItem key={poke.id} poke={poke} onClick={goto} />
                    )
                })}
            </Row>
            {isLoading ? 
            <Loading/>:
            (haveMore && <Row style={{paddingBottom : "10px"}} justify='center'>
                <Button onClick={loadPokemon}>More</Button>
            </Row>)}
        </Fragment>
    );
}

export default PokeList;

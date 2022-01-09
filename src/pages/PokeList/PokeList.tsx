import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../component/Loading';
import pokeapi, { getPoke, getPokeResult } from '../../services/pokeapi';

const PokeList = () => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [pokemonList, setPokemonList] = useState<Array<getPokeResult>>([]);
    const navigate = useNavigate();

    const goto = (name : string) => {
        navigate(`/${name}`);
    }

    useEffect(() => {
        pokeapi.getPokemonList(151, 0)
        .then(res => {
            const pokemon : getPoke = res.data.pokemons;
            setPokemonList(pokemon.results);
            setLoading(false);
        })

    }, [])

    return (
        <div>
            Poke List
            {isLoading ? 
            <Loading/> :
            <div>
                {pokemonList.map(poke => {
                    return (
                        <div key={poke.id} onClick={() => {goto(poke.name)}}>
                            <img src={poke.image} alt={`${poke.name}`}/>
                            <div>{poke.name}</div>
                        </div>
                    )
                })}
            </div>
            }
            <div onClick={() => {setLoading(false)}}>
                Get pokemon
            </div>
        </div>
    );
}

export default PokeList;

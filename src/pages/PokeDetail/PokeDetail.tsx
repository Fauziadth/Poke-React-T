import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../component/Loading';
import pokeapi, { getPokeDetails } from '../../services/pokeapi';
import { getColorType, type_color } from '../../constant';
import { myPokemonInt, usePokemonContext } from '../../context/MyPokemonContext';

export type detailRouteParams = {
    poke_id : string
}

const initDetails : getPokeDetails = {
    id: 0,
    name: "",
    sprites: {
        front_default: "",
        back_default: "",
    },
    moves: [],
    types: [],
    stats: []
}

const PokeDetail = () => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [pokeDetails, setPokeDetails] = useState<getPokeDetails>(initDetails);
    const navigate = useNavigate();
    const { pokemon, setPokemon } = usePokemonContext();

    let params = useParams<detailRouteParams>();

    useEffect(() => {
        if(!params.poke_id) return;
        // Fetch for pokemon details here
        pokeapi.getPokemonDetail(params.poke_id)
        .then(res => {
            const pokemon : getPokeDetails = res.data.pokemon;
            setPokeDetails(pokemon);
            setLoading(false);
        })
    }, [])

    const catchPoke = () => {
        const newPoke : myPokemonInt = {
            img : pokeDetails.sprites.front_default,
            name : pokeDetails.name,
            nickname : "BROOO"
        }
        setPokemon([...pokemon, newPoke]);
    }

    return (
        <div>
            Poke Detail 
            <Button onClick={() => {navigate(`/`)}}>
                Back
            </Button>
            {isLoading ? 
            <Loading/> :
            <div>
                <img src={pokeDetails.sprites.front_default} alt={pokeDetails.name}/>
                {pokeDetails.name}
                {pokeDetails.types.map((t, i) => {
                    return <div key={i} style={{backgroundColor : getColorType(t.type.name)}}>{t.type.name}</div>
                })}
                {pokeDetails.stats.map((s, i) => {
                    return <div key={i}>{`${s.stat.name} ${s.base_stat}`}</div>
                })}
                <Button onClick={() => {catchPoke();}}>
                    Catch
                </Button>
            </div>
            }
        </div>
    );
}

export default PokeDetail;

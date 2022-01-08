import React, { useState } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { usePokemonContext } from '../../context/MyPokemonContext';

const MyPoke = () => {
    const navigate = useNavigate();
    const { pokemon, setPokemon } = usePokemonContext();
    const releasePokemon = (idx : number) => {
        setPokemon(pokemon.filter((p, i) => i !== idx));
    }

    return (
        <div>
            MY POKE
            {pokemon.map((poke, i) => (
                <div key={i}>
                    <img src={poke.img} alt={poke.name}></img>
                    <div>{poke.nickname}</div>
                    <Button onClick={() => {releasePokemon(i)}}>
                        Release
                    </Button>
                </div>
            ))}
            <Button onClick={() => {navigate(`/`)}}>
                Back
            </Button>
        </div>
    );
}

export default MyPoke;

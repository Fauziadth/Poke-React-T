import React from 'react';
import { usePokemonContext } from '../../context/MyPokemonContext';

const PokeList = () => {
    const {pokemon, setPokemon} = usePokemonContext();
    return (
        <div>
            Poke List
            {pokemon}
            <div onClick={() => {setPokemon("COBBBAAA SET POKEEE")}}>
                Set pokemon ads
            </div>
        </div>
    );
}

export default PokeList;

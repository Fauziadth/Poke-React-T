import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MyPokemonContext } from './context/MyPokemonContext';
import PokeDetail from './pages/PokeDetail/PokeDetail';
import PokeList from './pages/PokeList/PokeList';
import './styles/App.css';

const App = () => {

  const [count, setCount] = useState(0);
  const [pokemon, setPokemon] = useState("");

  return (
    <MyPokemonContext.Provider value={{pokemon, setPokemon}}>
      <div className="App">
        Count {count}
        <div onClick={() => { setCount(count + 1) }}> adsasdasd </div>
        Pokemon Utama {pokemon}
        <Routes>
          <Route path="/" element={<PokeList />} />
          <Route path="/:poke_id" element={<PokeDetail />} />
        </Routes>
      </div>
    </MyPokemonContext.Provider>
  );
}

export default App;

import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { myPokemonInt, MyPokemonContext } from './context/MyPokemonContext';
import MyPoke from './pages/MyPoke/MyPoke';
import PokeDetail from './pages/PokeDetail/PokeDetail';
import PokeList from './pages/PokeList/PokeList';
import './styles/App.css';

const App = () => {
  const [pokemon, setPokemon] = useState<Array<myPokemonInt>>([]);
  const navigate = useNavigate();

  return (
    <MyPokemonContext.Provider value={{pokemon, setPokemon}}>
      <div className="App">
        Pokemon 
        <Button onClick={() => {navigate("/myPoke")}}>My Pokemon</Button>
        <Routes>
          <Route path="/" element={<PokeList />} />
          <Route path="/:poke_id" element={<PokeDetail />} />
          <Route path="/myPoke" element={<MyPoke />} />
        </Routes>
      </div>
    </MyPokemonContext.Provider>
  );
}

export default App;

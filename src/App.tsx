import React, { useState } from 'react';
import { Button } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { myPokemonInt, MyPokemonContext } from './context/MyPokemonContext';
import MyPoke from './pages/MyPoke/MyPoke';
import PokeDetail from './pages/PokeDetail/PokeDetail';
import PokeList from './pages/PokeList/PokeList';
import 'antd/dist/antd.min.css';
import './styles/App.css';

const getPokemonLocal = () => {
  const poke = localStorage.getItem("myPoke");
  if (poke)
    return JSON.parse(poke);
  else
    return [];
}

const App = () => {
  const [pokemon, setPokemon] = useState<Array<myPokemonInt>>(getPokemonLocal());
  const navigate = useNavigate();
  const setPokemonCustom = (poke: React.SetStateAction<myPokemonInt[]>) => {
    localStorage.setItem("myPoke", JSON.stringify(poke))
    setPokemon(poke);
  }

  return (
    <MyPokemonContext.Provider value={{ pokemon, setPokemon: setPokemonCustom }}>
      <div className="App">
        Pokemon
        <Button onClick={() => { navigate(`/myPoke`) }}>My Pokemon</Button>
        <Routes>
          <Route path={`/`} element={<PokeList />} />
          <Route path={`/:poke_id`} element={<PokeDetail />} />
          <Route path={`/myPoke`} element={<MyPoke />} />
        </Routes>
      </div>
    </MyPokemonContext.Provider>
  );
}

export default App;

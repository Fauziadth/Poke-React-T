import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { myPokemonInt, MyPokemonContext, NewPokemonContext } from './context/MyPokemonContext';
import MyPoke from './pages/MyPoke/MyPoke';
import PokeDetail from './pages/PokeDetail/PokeDetail';
import PokeList from './pages/PokeList/PokeList';
import 'antd/dist/antd.min.css';
import './styles/App.css';
import PokeHeader from './component/PokeHeader';

const getPokemonLocal = () => {
  const poke = localStorage.getItem("myPoke");
  if (poke)
    return JSON.parse(poke);
  else
    return [];
}

const App = () => {
  const [pokemon, setPokemon] = useState<Array<myPokemonInt>>(getPokemonLocal());
  const [newPoke, setNewPoke] = useState<boolean>(false);
  const setPokemonCustom = (poke: React.SetStateAction<myPokemonInt[]>) => {
    localStorage.setItem("myPoke", JSON.stringify(poke))
    setPokemon(poke);
    setNewPoke(true);
  }

  return (
    <MyPokemonContext.Provider value={{ pokemon, setPokemon: setPokemonCustom }}>
      <NewPokemonContext.Provider value={{ isNew: newPoke, setIsNew : setNewPoke }}>
        <div className="App">
          <PokeHeader/>
          <Routes>
            <Route path={`/`} element={<PokeList />} />
            <Route path={`/:poke_id`} element={<PokeDetail />} />
            <Route path={`/myPoke`} element={<MyPoke />} />
          </Routes>
        </div>
      </NewPokemonContext.Provider>
    </MyPokemonContext.Provider>
  );
}

export default App;

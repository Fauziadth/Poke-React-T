import { createContext, useContext } from "react"


export interface myPokemonInt {
  img: string;
  name: string;
  nickname: string;
}

export type PokemonContent = {
  pokemon: Array<myPokemonInt>;
  setPokemon: (c: Array<myPokemonInt>) => void
}

export const MyPokemonContext = createContext<PokemonContent>({
  pokemon: [], // set a default value
  setPokemon: () => { },
})

export const usePokemonContext = () => useContext(MyPokemonContext)

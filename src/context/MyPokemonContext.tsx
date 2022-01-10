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

export type newPoke = {
  isNew: boolean;
  setIsNew: (isNew: boolean) => void
}

export const NewPokemonContext = createContext<newPoke>({
  isNew: false, // set a default value
  setIsNew: () => { },
})
export const useNewPokemonContext = () => useContext(NewPokemonContext)
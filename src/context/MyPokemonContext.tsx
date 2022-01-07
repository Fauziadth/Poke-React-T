import { createContext, useContext } from "react"
export type PokemonContent = {
  pokemon: string
  setPokemon:(c: string) => void
}
export const MyPokemonContext = createContext<PokemonContent>({
pokemon: "", // set a default value
setPokemon: () => {},
})
export const usePokemonContext = () => useContext(MyPokemonContext)

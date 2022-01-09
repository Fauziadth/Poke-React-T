
export type pokemonType = "normal" | "fire" | "fighting" | "water" | "flying" | "grass" | "poison" | "electric" | "ground" | "psychic" | "rock" | "ice" | "bug" | "dragon" | "ghost" | "dark" | "steel" | "fairy" | "unknown"

export const type_color = {
    normal : '#A8A878',
    fire : '#F08030',
    fighting : '#C03028',
    water : '#6890F0',
    flying : '#A890F0',
    grass : '#78C850',
    poison : '#A040A0',
    electric : '#F8D030',
    ground : '#E0C068',
    psychic : '#F85888',
    rock : '#B8A038',
    ice : '#98D8D8',
    bug : '#A8B820',
    dragon : '#7038F8',
    ghost : '#705898',
    dark : '#705848',
    steel : '#B8B8D0',
    fairy : '#EE99AC',
    unknown : '#68A090'
} ;

export const getColorType:any = (color : pokemonType) => (type_color[color])
export const BASENAME = "poke-react-t";
import { pokemonType } from "../constant";

const pokegraphql = "https://graphql-pokeapi.graphcdn.app";

export interface getPokeResult {
    id: number,
    url: string,
    name: string,
    image: string
}

export interface getPoke {
    count: number,
    next: string,
    previous: string,
    status: boolean,
    message: string,
    results: Array<getPokeResult>
}

export interface getPokeDetails {
    id: number,
    name: string,
    sprites: {
        front_default: string,
        back_default: string,
    },
    moves: Array<{
        move: {
            name: string
        }
    }>,
    types: Array<{
        type: {
            name: pokemonType
        }
    }>,
    stats: Array<{
        base_stat: number,
        stat: {
            name: string
        }
    }>
}

const pokeapi = {
    getPokemonList: (limit: number, offset: number) => {
        const gqlQuery = `query pokemons($limit: Int, $offset: Int) {
            pokemons(limit: $limit, offset: $offset) {
            count
            next
            previous
            status
            message
            results {
                id
                url
                name
                image
            }
            }
        }`;

        const gqlVariables = {
            limit,
            offset,
        };

        return fetch(pokegraphql, {
            credentials: 'omit',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: gqlQuery,
                variables: gqlVariables,
            }),
            method: 'POST',
        })
            .then(res => res.json())
    },

    getPokemonDetail: (name: string) => {
        const gqlQuery = `query pokemon($name: String!) {
            pokemon(name: $name) {
              id
              name
              sprites {
                front_default,
                back_default
              }
              moves {
                move {
                  name
                }
              }
              types {
                type {
                  name
                }
              }
              stats {
                  base_stat,
                  stat {
                      name
                  }
              }
            }
        }`;

        const gqlVariables = {
            name
        };

        return fetch(pokegraphql, {
            credentials: 'omit',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: gqlQuery,
                variables: gqlVariables,
            }),
            method: 'POST',
        })
            .then(res => res.json())
    }
}

export default pokeapi;
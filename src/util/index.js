export const fetchPokemon = async (pokemonId) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
    }
}

export const fetchPokemonSpecific = async (pokemonId) => {
    try {
        const specificResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
        const specificResult = await specificResponse.json()
        return specificResult
    } catch (error) {
        console.log(error)
    }
}

export const fetchRandomPokemon = async () => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${Math.floor(Math.random() * 900)}`)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
    }
}
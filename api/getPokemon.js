export const getPokemon = async () => {
    try {
        console.log("sup pup");
        const response = await fetch(" https://pokeapi.co/api/v2/pokemon/");
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.log("error")
    }
}


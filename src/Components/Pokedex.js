import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"
import "./Pokedex.css"

const Pokedex = () => {

    const initialPokemonId = 1;
    
    const [pokemonId, setPokemonId] = useState(initialPokemonId);
    const [name, setName] = useState();
    const [image, setImage] = useState();
    const [baseImage, setBaseImage] = useState();
    const [backImage, setBackImage] = useState();
    const [shinyImage, setShinyImage] = useState();
    const [shinyBackImage, setShinyBackImage] = useState();
    const [isShiny, setIsShiny] = useState(false);
    const [face, setFace] = useState(true);
    const [type1, setType1] = useState();
    const [type2, setType2] = useState();
    const [flavorText, setFlavorText] = useState();
    const [moves, setMoves] = useState();
    const [searchParams, setSearchParams] = useSearchParams()
    const searchTerm = searchParams.get("searchTerm")

    const baseURL = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    const speciesEndpoint = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`

    const fetchPokemon = async () => {

        if (pokemonId < 1 || pokemonId > 899) {
            // alert("Pokemon does not exist")
            return false
        } 

        try {
            const response = await fetch(baseURL);
            const result = await response.json();
            console.log(result);
            const resultName = result.name;
            const name = resultName[0].toUpperCase() + resultName.slice(1);
            setName(name);


            const baseImage = result.sprites.front_default;
            setBaseImage(baseImage)
            setImage(baseImage);

            const backImage = result.sprites.back_default;
            setBackImage(backImage)

            const shinyImage = result.sprites.front_shiny;
            setShinyImage(shinyImage)

            const shinyBackImage = result.sprites.back_shiny;
            setShinyBackImage(shinyBackImage)
            

            const moves = result.moves;
            console.log(moves);
            setMoves(moves)

            const resultType1 = result.types[0].type.name;
            const type1 = resultType1[0].toUpperCase() + resultType1.slice(1);
            // console.log(type1);
            setType1(type1);

            const specificResponse = await fetch(speciesEndpoint)
            const specificResult = await specificResponse.json()
            const flavorText = specificResult.flavor_text_entries[0].flavor_text;
            // console.log(flavorText)
            setFlavorText(flavorText)

            if (!result.types[1].type.name) {
                const type2 = null
                
            } else if (result.types[1].type.name) {
                const resultType2 = result.types[1].type.name;
                const type2 = resultType2[0].toUpperCase() + resultType2.slice(1);
                // console.log(type2);
                setType2(type2);
            }

        } catch (error) {
            let type2 = null
            setType2(type2)
            // console.error("Sad puppy");
        } 
    }

    const handleImage = () => {
        if (!isShiny) {
            setIsShiny(true)
            face ? setImage(shinyImage) : setImage(shinyBackImage)
        } 
        if (isShiny) {
            setIsShiny(false);
            face ? setImage(baseImage) : setImage(backImage)
        }
    }

    const handleFace = () => {
        if (face) {
            setFace(false)
            if (isShiny) { setImage (shinyBackImage)}
            if (!isShiny) { setImage (backImage) }
        }
        if (!face) {
            setFace(true)
            if (isShiny) { setImage (shinyImage) }
            if (!isShiny) { setImage (baseImage) }
        }
    }

    useEffect(fetchPokemon, [])

    return <>
        <h1> Sup Pokedex</h1>
        <div id="pokedex">
            <div id="leftPokedex">
                <div>
                    <div className="blinkers">
                        <div className="bigBlink">Hello</div>
                        <div className="redBlink">Red</div>
                        <div className="yellowBlink">Yellow</div>
                        <div className="blueBlink">Blue</div>
                    </div>
                </div>
                <div className="pokemonDisplay">
                    <img id="pokemonImage" src={image} alt={name}></img>
                    <div id="pokemonName">#{pokemonId} {name}</div>
                </div>

                <button id="randomPokemon" onClick={() => {setPokemonId(Math.floor(Math.random() * 898)); fetchPokemon()}}>Random Pokemon</button>

                <div className="navigation">
                    <input type="number" name="search" placeholder="Search" min="1" max="898" value={searchTerm} onChange={(event) => {
                        setPokemonId(event.target.value);
                        setSearchParams({searchTerm: event.target.value})
                    }}/>
                    <button id="previousButton" onClick={() => {
                        fetchPokemon(pokemonId - 1);
                        setPokemonId(pokemonId - 1)
                    }}>Previous Pokemon</button>
                    <button id="nextButton" onClick={() => {
                        setPokemonId(pokemonId + 1);
                        fetchPokemon(pokemonId + 1);
                        console.log(pokemonId)
                    }}>Next Pokemon</button>
                </div>
                <button className="shinyToggle" onClick={() => {
                    handleImage()
                }}>Shiny Variant</button>
                <button className="faceToggle" onClick={() => {
                    handleFace()
                }}>Rotate Pokemon</button>
                <div className="moves">
                    {/* {
                        moves.map((move) => {
                            return (
                                <div key={move.id}>{move.move.name}</div>
                            )
                        })
                    } */}
                    Pokemon Moves to be labeled here:
                    1: 
                    2: 
                    3: 
                    4:
                </div>
            </div>


            <div id="rightPokedex">
                <div className="description">
                    <div className="types">
                        <span id="type1">{type1}</span> 
                        <span id="type2"> {type2}</span>
                    </div>
                    <div>{flavorText}</div> 
                </div>

                <div id="generationButtons">
                    <button className="generationButtonsClass" id="generation1" onClick={() => setPokemonId(initialPokemonId)}>Generation 1</button>
                    <button className="generationButtonsClass" id="generation2" onClick={() => setPokemonId(152)}>Generation 2</button>
                    <button className="generationButtonsClass" id="generation3" onClick={() => setPokemonId(252)}>Generation 3</button>
                    <button className="generationButtonsClass" id="generation4" onClick={() => setPokemonId(387)}>Generation 4</button>
                    <button className="generationButtonsClass" id="generation5" onClick={() => setPokemonId(495)}>Generation 5</button>
                    <button className="generationButtonsClass" id="generation6" onClick={() => setPokemonId(650)}>Generation 6</button>
                    <button className="generationButtonsClass" id="generation7" onClick={() => setPokemonId(722)}>Generation 7</button>
                    <button className="generationButtonsClass" id="generation8" onClick={() => setPokemonId(810)}>Generation 8</button>
                </div>
                <div>
                    <div> Weight: Height:</div>
                    <div> Something to put here</div>
                </div>
            </div>
        </div> 
        </>
};

export default Pokedex;
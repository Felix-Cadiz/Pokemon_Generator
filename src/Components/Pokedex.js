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
    const [weight, setWeight] = useState();
    const [height, setHeight] = useState();
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
            setIsShiny(false);
            setFace(true);
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
            

            const resultMoves = result.moves;
            console.log(resultMoves);
            setMoves(resultMoves)

            const specificResponse = await fetch(speciesEndpoint)
            const specificResult = await specificResponse.json()
            const flavorText = specificResult.flavor_text_entries[0].flavor_text;
            setFlavorText(flavorText)

            const resultType1 = result.types[0].type.name;
            const type1 = resultType1[0].toUpperCase() + resultType1.slice(1);
            setType1(type1);

            const resultWeight = result.weight * 0.1;
            const kgWeight = resultWeight.toFixed(2);
            setWeight(kgWeight)

            const resultHeight = result.height * 0.1;
            const mHeight = resultHeight.toFixed(2);
            setHeight(mHeight)

            if (result.types[1].type.name) {
                const resultType2 = result.types[1].type.name;
                const type2 = resultType2[0].toUpperCase() + resultType2.slice(1);
                setType2(type2);
            }

        } catch (error) {
            let type2 = null
            setType2(type2)
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

    useEffect(fetchPokemon, [pokemonId])

    return <>
        <h1> Sup Pokedex</h1>
        <div id="pokedex">
            <div id="leftPokedex">
                <div>
                    <div className="blinkers">
                        <div className="bigBlink">BigBlue</div>
                        <div className="redBlink">Red</div>
                        <div className="yellowBlink">Yellow</div>
                        <div className="blueBlink">Blue</div>
                    </div>
                </div>
                <div className="pokemonDisplay">
                    <img id="pokemonImage" src={image} alt={name}></img>
                    <div id="pokemonName">#{pokemonId} {name}</div>
                </div>
{/* One step behind */}
                <button id="randomPokemon" onClick={() => {
                    setPokemonId(Math.floor(Math.random() * 898)); 
                    setSearchParams({searchTerm: pokemonId});
                    fetchPokemon();
                    }}>Random Pokemon</button>

                <div className="navigation">
                    <input type="number" name="search" placeholder="Search" min="1" max="898" value={searchTerm} onChange={(event) => {
                        setPokemonId(event.target.value);
                        setSearchParams({searchTerm: event.target.value})
                        fetchPokemon()
                    }}/>
{/* One step behind */}
                    <button id="previousButton" onClick={() => {
                        setPokemonId(pokemonId - 1)
                        setSearchParams({searchTerm: pokemonId});
                        fetchPokemon(pokemonId - 1);
                    }}>Previous Pokemon</button>
{/* One step behind */}
                    <button id="nextButton" onClick={() => {
                        setPokemonId(pokemonId + 1);
                        setSearchParams({searchTerm: pokemonId});
                        fetchPokemon(pokemonId + 1);
                    }}>Next Pokemon</button>
                </div>
                <div className="moves">
                    {/* filter within map */}
                    {/* {
                        moves.map(move => {
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
                    <div className="typewriter">{flavorText}</div> 
                </div>

                <div id="generationButtons">
                    {/* add fetchPokemon() to each of the buttons */}
                    <button className="generationButtonsClass" id="generation1" onClick={() => {
                        setPokemonId(initialPokemonId)
                        setSearchParams({searchTerm: 1});
                    }}>Generation 1</button>
                    <button className="generationButtonsClass" id="generation2" onClick={() => {
                        setPokemonId(152);
                        setSearchParams({searchTerm: 152});
                    }}>Generation 2</button>
                    <button className="generationButtonsClass" id="generation3" onClick={() => {
                        setPokemonId(252);
                        setSearchParams({searchTerm: 252});
                    }}>Generation 3</button>
                    <button className="generationButtonsClass" id="generation4" onClick={() => {
                        setPokemonId(387);
                        setSearchParams({searchTerm: 387});
                        }}>Generation 4</button>
                    <button className="generationButtonsClass" id="generation5" onClick={() => {
                        setPokemonId(495);
                        setSearchParams({searchTerm: 495});
                        }}>Generation 5</button>
                    <button className="generationButtonsClass" id="generation6" onClick={() => {
                        setPokemonId(650);
                        setSearchParams({searchTerm: 650});
                    }}>Generation 6</button>
                    <button className="generationButtonsClass" id="generation7" onClick={() => {
                        setPokemonId(722);
                        setSearchParams({searchTerm: 722})
                    }}>Generation 7</button>
                    <button className="generationButtonsClass" id="generation8" onClick={() => {
                        setPokemonId(810);
                        setSearchParams({serachTerm: 810});
                    }}>Generation 8</button>
                </div>
                <div className="imageToggles">
                    <button className="faceToggle" onClick={() => {
                        handleFace()
                    }}> Front | Back </button>
                    <button className="shinyToggle" onClick={() => {
                        handleImage()
                    }}>Shiny</button>
                </div>
                <div className="detailsContainer">
                    <div className="details weight"> Weight: {weight}kg </div>
                    <div className="details height"> Height: {height}m </div> 
                </div>
            </div>
        </div> 
        </>
};

export default Pokedex;
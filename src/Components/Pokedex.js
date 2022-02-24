import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"
import "./Pokedex.css"

const Pokedex = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const searchTerm = searchParams.get("searchTerm")
    
    const [pokemonId, setPokemonId] = useState(Number(searchTerm || 1));
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

    const baseURL = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    const speciesEndpoint = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`

    const fetchPokemon = async () => {

        if (pokemonId < 1 || pokemonId > 899) {
            return false
        } 

        try {
            setIsShiny(false);
            setFace(true);
            const response = await fetch(baseURL);
            const result = await response.json();
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
            const slicedMoves = resultMoves.slice(0, 4)
            setMoves(slicedMoves)

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

    const handleRandomPokemon = () => {
        let randomPokemonId = Math.floor(Math.random() * 898);
        setPokemonId(randomPokemonId); 
        setSearchParams({searchTerm: randomPokemonId});
        fetchPokemon();
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
                <button id="randomPokemon" onClick={() => {
                    handleRandomPokemon()
                    }}>Random Pokemon</button>

                <div className="navigation">
                    <input type="number" name="search" placeholder="Search" min="1" max="898" value={searchTerm} onChange={(event) => {
                        if (event.target.value < 0 || event.target.value >= 899) { return false }
                        setPokemonId(event.target.value);
                        setSearchParams({searchTerm: event.target.value})
                        fetchPokemon()
                    }}/>
                    <button id="previousButton" onClick={() => {
                        if (pokemonId > 1) {
                            setPokemonId(pokemonId - 1)
                            setSearchParams({searchTerm: pokemonId - 1});
                            fetchPokemon(pokemonId);
                        } 
                    }}>Previous Pokemon</button>
                    <button id="nextButton" onClick={() => {
                        if (pokemonId < 898) {
                            setPokemonId(Number(pokemonId) + 1);
                            setSearchParams({searchTerm: Number(pokemonId) + 1});
                            fetchPokemon(pokemonId);
                        }
                    }}>Next Pokemon</button>
                </div>
                <div className="moves">
                    { moves ?
                        moves.map((move) => {
                            return (
                                <div className="individualMove" key={move.name}>{move.move.name[0].toUpperCase() + move.move.name.slice(1)}</div>
                            )
                        })
                    : null
                    }
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
                        setPokemonId(1);
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
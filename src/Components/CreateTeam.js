import {React, useEffect, useState} from "react";
import Select from "react-select"
import Dropdown from "react-dropdown"
import "./CreateTeam.css"

const CreateTeam = () => {

    const [type, setType] = useState();
    const [typeOptions, setTypeOptions] = useState();
    const [selectedType, setSelectedType] = useState(null);

    const typeURL = `https://pokeapi.co/api/v2/type/`
    const specificTypeURL = `https://pokeapi.co/api/v2/type/normal`

    const fetchTypes = async () => {

        try {
            const response = await fetch(typeURL)
            const result = await response.json()
            const specificTypes = result.results
            const individualType = specificTypes.map((specificType) => {
                return specificType.name[0].toUpperCase() + specificType.name.slice(1);
            })
            setTypeOptions(individualType)

            const specificPokemonType = await fetch(specificTypeURL)
            const specificPokemonTypeResult = await specificPokemonType.json()
            console.log(specificPokemonTypeResult.pokemon)

        } catch (error) {
            throw error
        }
    }

    useEffect(fetchTypes, [])

    const handleTypeSelection = async () => {
        console.log("here")
        // setType must be set to selected option value
        console.log(type)
    }



    return <>
    
    <h1> Sup CreateTeam</h1>

    <button> Random Team </button>
    <Dropdown options={typeOptions} className="gymLeader" placeholder="Gym Leader" onChange={() => {
        
        // console.log(typeOptions)
        handleTypeSelection();
    }}/>

    <div className="body">
            <div className="container" onClick={() => {
                console.log("hello")
            }}>
                <div className="pokeball">
                    <div className="middle"></div>
                    <div className="middleCircle">
                        <div className="innerCircle"></div>
                    </div>
                </div>
                <div className="shadow"></div>
            </div>

            <div className="container">
                <div className="pokeball">
                    <div className="middle"></div>
                    <div className="middleCircle">
                        <div className="innerCircle"></div>
                    </div>
                </div>
                <div className="shadow"></div>
            </div>

            <div className="container">
                <div className="pokeball">
                    <div className="middle"></div>
                    <div className="middleCircle">
                        <div className="innerCircle"></div>
                    </div>
                </div>
                <div className="shadow"></div>
            </div>

            <div className="container">
                <div className="pokeball">
                    <div className="middle"></div>
                    <div className="middleCircle">
                        <div className="innerCircle"></div>
                    </div>
                </div>
                <div className="shadow"></div>
            </div>

            <div className="container">
                <div className="pokeball">
                    <div className="middle"></div>
                    <div className="middleCircle">
                        <div className="innerCircle"></div>
                    </div>
                </div>
                <div className="shadow"></div>
            </div>

            <div className="container">
                <div className="pokeball">
                    <div className="middle"></div>
                    <div className="middleCircle">
                        <div className="innerCircle"></div>
                    </div>
                </div>
                <div className="shadow"></div>
                
            </div>
        </div>
    </>
};

export default CreateTeam;
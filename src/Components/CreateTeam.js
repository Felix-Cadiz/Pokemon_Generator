import {React, useEffect, useState} from "react";
import Dropdown from "react-dropdown";
import "./CreateTeam.css"

const CreateTeam = () => {

    const [type, setType] = useState(1);
    const [typeOptions, setTypeOptions] = useState();

    const typeURL = `https://pokeapi.co/api/v2/type/`

    const fetchTypes = async () => {

        try {
            const response = await fetch(typeURL)
            const result = await response.json()
            const specificTypes = result.results
            console.log(result)
            console.log(specificTypes)
            const individualType = specificTypes.map((specificType) => {
                return specificType.name
            })
            console.log(individualType)
            setTypeOptions(individualType)


        } catch (error) {
            throw error
        }
    }

    useEffect(fetchTypes, [])

    return <>
    
    <h1> Sup CreateTeam</h1>

    <button> Random Team </button>
    <Dropdown options={typeOptions} placeholder="Gym Leader"></Dropdown>

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
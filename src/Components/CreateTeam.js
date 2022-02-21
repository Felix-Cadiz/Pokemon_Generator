import React from "react";
import "./CreateTeam.css"

const CreateTeam = () => {
    return <>
    <h1> Sup CreateTeam</h1>

    <button> Random Team </button>
    <button> Gym Leader </button>

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
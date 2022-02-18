import React from "react";
import ReactDom from "react-dom";
import { Routes, Route, NavLink, BrowserRouter as Router } from "react-router-dom";
import "./index.css";

import {
    Home, 
    Pokedex,
    CreateTeam, 
    About,
} from "./Components/index.js"

const App = () => {
    return <>
        <h1> Pokemon Generator </h1>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/createteam">Create your team!</NavLink>
            <NavLink to="/pokedex">Pokédex</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav>

        <Routes>
            <Route path="/" exact element={ <Home />}/>
            <Route path="/about" element={ <About />} />
            <Route path="/createTeam" element={ <CreateTeam />}/>
            <Route path="/pokedex" element={ <Pokedex />}/>
        </Routes>
    </>
}

ReactDom.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("app")
)
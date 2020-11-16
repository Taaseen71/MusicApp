import React from "react";
import "./styles/App.scss"
import Player from "./components/Player"
import Song from "./components/Song";

function App() {
    return (
        <div >
            <h1>Music Player</h1>
            <Player />
            <Song />
        </div>
    );
}

export default App;

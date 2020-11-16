import React, { useState } from "react";
import "./styles/App.scss"
import Player from "./components/Player"
import Song from "./components/Song";
import SongList from "./components/SongList"
import chillHop from "./util"



function App() {
    const [musicData, setMusicData] = useState(chillHop())
    const [currentSong, setCurrentSong] = useState(musicData[0])

    console.log(musicData);
    return (
        <div >
            <h1>Music Player</h1>
            <Song currentSong={currentSong} />
            <Player currentSong={currentSong} />
            <aside>
                <SongList musicData={musicData} />
            </aside>
        </div>
    );
}

export default App;

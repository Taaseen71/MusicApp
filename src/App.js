import React, { useState, useEffect } from "react";
import "./styles/App.scss"
import Player from "./components/Player"
import Song from "./components/Song";
import SongList from "./components/SongList"
import chillHop from "./util"
import { v4 as uuidv4 } from 'uuid';


function App() {
    uuidv4()
    const [musicData, setMusicData] = useState(chillHop())
    const [currentSong, setCurrentSong] = useState(musicData[2])
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        // console.log(musicData);
    }, [musicData])

    useEffect(() => {
        // console.log("Music is PLaying =", isPlaying)
        // console.log("Current Song = ", currentSong)
    }, [isPlaying])

    return (
        <div >
            <h1 style={{ backgroundColor: currentSong.color[0], opacity: 0.3 }}>Music Player</h1>
            <Song currentSong={currentSong} />
            <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
            <aside>
                <SongList musicData={musicData} />
            </aside>
        </div>
    );
}

export default App;

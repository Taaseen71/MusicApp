import React, { useState, useEffect, useRef } from "react";
import "./styles/App.scss"
import Player from "./components/Player"
import Song from "./components/Song";
import Library from "./components/Library"
import chillHop from "./util"
import { v4 as uuidv4 } from 'uuid';
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPauseCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons"

function App() {
    uuidv4()
    const [playPauseButton, setPlayPauseButton] = useState(faPlayCircle);
    const [musicData, setMusicData] = useState(chillHop())
    const [currentSong, setCurrentSong] = useState(musicData[0])
    const [isPlaying, setIsPlaying] = useState(false)
    const [menuBar, setMenuBar] = useState(faBars)
    const [display, setDisplay] = useState(false)
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    })

    const audioRef = useRef(null);

    const timeUpdateHandler = (e) => {
        const localTime = e.target.currentTime;
        const localDuration = e.target.duration
        setSongInfo({ ...songInfo, currentTime: localTime, duration: localDuration })
    }

    useEffect(() => {
        // console.log(musicData);
    }, [musicData])

    useEffect(() => {
        console.log("Music is PLaying =", isPlaying)
        // console.log("Current Song = ", currentSong)
    }, [isPlaying])

    const handleMenuBar = (e) => {
        e.preventDefault();
        if (menuBar === faBars) {
            setMenuBar(faTimes)
            // setDisplay("block")
        }
        else {
            setMenuBar(faBars)
            // setDisplay("none")
        }
        setDisplay(!display);
    }





    return (
        <div >
            <div className="menuSVG">
                <FontAwesomeIcon className="LibraryMenu" size="5x" icon={menuBar} onClick={handleMenuBar} />
            </div>
            <Song currentSong={currentSong} />
            <Player timeUpdateHandler={timeUpdateHandler} songInfo={songInfo} setSongInfo={setSongInfo} currentSong={currentSong} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} playPauseButton={playPauseButton} setPlayPauseButton={setPlayPauseButton} />
            <aside>
                <Library playPauseButton={playPauseButton} setPlayPauseButton={setPlayPauseButton} setMusicData={setMusicData} musicData={musicData} audioRef={audioRef} display={display} setDisplay={setDisplay} setIsPlaying={setIsPlaying} setCurrentSong={setCurrentSong} isPlaying={isPlaying} />
            </aside>
            <audio ref={audioRef} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} src={currentSong.audio}></audio>

        </div>
    );
}

export default App;

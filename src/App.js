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
    const [currentSong, setCurrentSong] = useState(musicData[getRandomNumber(0, musicData.length)])
    const [isPlaying, setIsPlaying] = useState(false)
    const [menuBar, setMenuBar] = useState(faBars)
    const [display, setDisplay] = useState(false)
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    })

    const audioRef = useRef(null);

    // const randomNumber = (Math.floor(Math.random() * musicData.length))

    function getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }




    const timeUpdateHandler = (e) => {
        const localTime = e.target.currentTime;
        const localDuration = e.target.duration

        const roundedCurrent = Math.round(localTime);
        const roundedDuration = Math.round(localDuration);
        const animationPercentage = Math.round(roundedCurrent / roundedDuration * 100)
        // console.log(songInfo.animationPercentage)
        setSongInfo({ ...songInfo, currentTime: localTime, duration: localDuration, animationPercentage: animationPercentage })
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


    const songEndedHandler = async (e) => {
        e.preventDefault();
        setPlayPauseButton(faPlayCircle)
        await audioRef.current.pause();
        let songId = musicData.findIndex((findSong) => currentSong.id === findSong.id)

        //? if SongId exceeds musicData.length, set length == -1, so that it starts at -1 + 1 = 0
        if ((songId + 1) === musicData.length) {
            songId = -1
        }
        await setCurrentSong(musicData[songId + 1]);
        setPlayPauseButton(faPauseCircle);
        await audioRef.current.play();
        console.log("Playing Next Song:", musicData[songId + 1].name)
        return
    }


    return (
        <div >
            <div className="menuSVG">
                <FontAwesomeIcon className="LibraryMenu" size="5x" icon={menuBar} onClick={handleMenuBar} />
            </div>
            {/* <h1>Library</h1> */}
            <Song currentSong={currentSong} />
            <Player musicData={musicData} setMusicData={setMusicData} setCurrentSong={setCurrentSong} timeUpdateHandler={timeUpdateHandler} songInfo={songInfo} setSongInfo={setSongInfo} currentSong={currentSong} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} playPauseButton={playPauseButton} setPlayPauseButton={setPlayPauseButton} />
            <aside>
                <Library playPauseButton={playPauseButton} setPlayPauseButton={setPlayPauseButton} setMusicData={setMusicData} musicData={musicData} audioRef={audioRef} display={display} setDisplay={setDisplay} setIsPlaying={setIsPlaying} setCurrentSong={setCurrentSong} isPlaying={isPlaying} />
            </aside>
            <audio ref={audioRef} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} src={currentSong.audio} onEnded={songEndedHandler}></audio>

        </div>
    );
}

export default App;

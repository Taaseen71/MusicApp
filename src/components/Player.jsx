import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPlayCircle, faChevronCircleLeft, faChevronCircleRight, faPauseCircle, faVolumeMute, faVolumeDown } from "@fortawesome/free-solid-svg-icons"


function Player({ currentSong, isPlaying, setIsPlaying }) {

    const [playPauseButton, setPlayPauseButton] = useState(faPlayCircle);
    const [muted, setMuted] = useState(faVolumeDown)

    // console.log(currentSong);


    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    })

    const audioRef = useRef(null);


    //! Functions

    //? Set Seconds to Minutes Function
    function sec2time(timeInSeconds) {
        let pad = function (num, size) { return ('000' + num).slice(size * -1); },
            time = parseFloat(timeInSeconds).toFixed(3),
            hours = Math.floor(time / 60 / 60),
            minutes = Math.floor(time / 60) % 60,
            seconds = Math.floor(time - minutes * 60),
            milliseconds = time.slice(-3);

        return pad(minutes, 2) + ':' + pad(seconds, 2);
    }


    //! Event Handlers

    const next = (e) => {
        e.preventDefault();
        alert("Pressed next")
    }

    const previous = (e) => {
        e.preventDefault();
        alert("Pressed previous")
    }

    const changeState = (e) => {
        e.preventDefault();

        // playPause === faPauseCircle ? setPlayPause(faPlayCircle) : setPlayPause(faPauseCircle)

        if (playPauseButton === faPlayCircle) {
            //? Pressed Play Button
            setPlayPauseButton(faPauseCircle);
            setIsPlaying(true)
            audioRef.current.play();
        }
        else {
            //? Pressed Pause Button
            setPlayPauseButton(faPlayCircle)
            setIsPlaying(false)
            audioRef.current.pause();
        }
    }

    const timeUpdateHandler = (e) => {
        const localTime = e.target.currentTime;
        const localDuration = e.target.duration
        setSongInfo({ ...songInfo, currentTime: localTime, duration: localDuration })
        // console.log(e);
    }

    const dragHandler = (e) => {
        // console.log(e);
        setSongInfo({ ...songInfo, currentTime: e.target.value })
        audioRef.current.currentTime = e.target.value
        console.log(audioRef)
    }



    const muteHandler = (e) => {
        if (muted === faVolumeDown) {
            setMuted(faVolumeMute)
            console.log('muted')
            audioRef.current.muted = true

        }
        else {
            setMuted(faVolumeDown);
            console.log('unmuted')
            audioRef.current.muted = false
        }
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{sec2time(songInfo.currentTime)}</p>
                <input min={0} max={songInfo.duration} value={songInfo.currentTime} onChange={dragHandler} type="range" />
                <p>{sec2time(songInfo.duration)}</p>
                {/* <input className="volumeControl" min={0} max={100} type="range" /> */}
                <FontAwesomeIcon className="mute" size="2x" icon={muted} onClick={muteHandler} />
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="previous" size="5x" icon={faChevronCircleLeft} onClick={previous} />
                <FontAwesomeIcon className="play" size="5x" icon={playPauseButton} onClick={changeState} />
                <FontAwesomeIcon className="next" size="5x" icon={faChevronCircleRight} onClick={next} />
            </div>
            <audio ref={audioRef} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} src={currentSong.audio}></audio>
        </div>
    )
}

export default Player

import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPlayCircle, faChevronCircleLeft, faChevronCircleRight, faPauseCircle, faVolumeMute, faVolumeDown } from "@fortawesome/free-solid-svg-icons"


function Player({ currentSong, setCurrentSong, musicData, setMusicData, isPlaying, setIsPlaying, playPauseButton, setPlayPauseButton, audioRef, songInfo, setSongInfo, timeUpdateHandler }) {

    // const [playPauseButton, setPlayPauseButton] = useState(faPlayCircle);
    const [muted, setMuted] = useState(faVolumeDown)
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(10);

    // console.log(currentSong);
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


    useEffect(async () => {
        await setStartTime(sec2time(songInfo.currentTime))
        await setEndTime(sec2time(songInfo.duration))
    }, [songInfo])

    // useEffect(() => {
    //     if (songInfo.currentTime === songInfo.duration) {
    //         let songId = musicData.findIndex((findSong) => currentSong.id === findSong.id)
    //         setCurrentSong(musicData[songId + 1])
    //     }
    //     audioRef.current.play()
    // }, [songInfo])


    useEffect(() => {
        const newSongs = musicData.map((currentlyPlaying) => {
            if (currentlyPlaying.id === currentSong.id) {
                return {
                    ...currentlyPlaying,
                    active: true
                }
            }
            else {
                return {
                    ...currentlyPlaying,
                    active: false
                }
            }
        })
        setMusicData(newSongs)
    }, [currentSong])

    //! Event Handlers

    const next = async (e) => {
        e.preventDefault();
        setPlayPauseButton(faPlayCircle)
        await audioRef.current.pause();
        // alert("Pressed next")
        // console.log(currentSong.id)
        let songId = musicData.findIndex((findSong) => currentSong.id === findSong.id)

        //? if SongId exceeds musicData.length, set length == -1, so that it starts at -1 + 1 = 0
        if ((songId + 1) === musicData.length) {
            songId = -1
        }
        await setCurrentSong(musicData[songId + 1]);
        console.log("Playing Next Song:", musicData[songId + 1].name)
        setPlayPauseButton(faPauseCircle);
        await audioRef.current.play();
        return
    }

    const previous = async (e) => {
        e.preventDefault();
        setPlayPauseButton(faPlayCircle)
        await audioRef.current.pause();
        let songId = musicData.findIndex((findSong) => currentSong.id === findSong.id)

        //? if SongId < 0 musicData.length, set length == 6
        if ((songId) === 0) {
            songId = musicData.length
        }
        await setCurrentSong(musicData[songId - 1])
        console.log("Playing Previous Song:", musicData[songId - 1].name)
        setPlayPauseButton(faPauseCircle);
        await audioRef.current.play();
        return
    }

    const changeState = (e) => {
        e.preventDefault();

        //? Ternary ignored==>  playPause === faPauseCircle ? setPlayPause(faPlayCircle) : setPlayPause(faPauseCircle)

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



    const dragHandler = (e) => {
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

    //Adding Style
    const trackAnimation = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className="player">
            <div className="time-control">
                <h3>{startTime}</h3>
                <div className="track" style={{ background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})` }}>
                    <input min={0} max={songInfo.duration} value={songInfo.currentTime} onChange={dragHandler} type="range" />
                    <div className="animated-track" style={trackAnimation}></div>
                </div>
                <h3>{songInfo.duration ? endTime : '0:00'}</h3>
                {/* <input className="volumeControl" min={0} max={100} type="range" /> */}
                <FontAwesomeIcon className="mute" size="2x" icon={muted} onClick={muteHandler} />
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="previous" size="5x" icon={faChevronCircleLeft} onClick={previous} />
                <FontAwesomeIcon className="play" size="5x" icon={playPauseButton} onClick={changeState} />
                <FontAwesomeIcon className="next" size="5x" icon={faChevronCircleRight} onClick={next} />
            </div>

        </div>
    )
}

export default Player

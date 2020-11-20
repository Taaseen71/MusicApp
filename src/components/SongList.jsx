import React from 'react'
import { faPauseCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons"

function SongList({ song, musicData, setCurrentSong, setIsPlaying, audioRef, isPlaying, setMusicData, playPauseButton, setPlayPauseButton }) {


    const handleClick = async (e) => {
        e.preventDefault();
        setIsPlaying(false)
        await setCurrentSong(song);


        //? Add Active State
        const newSongs = musicData.map((currentlyPlaying) => {
            if (currentlyPlaying.id === song.id) {
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
        // newSongs()


        //? Check to see if song is playing
        if (isPlaying) {
            const playPromise = audioRef.current.play();
            setPlayPauseButton(faPauseCircle);

            if (playPromise !== undefined) {
                playPromise.then((audio) => {
                    audioRef.current.play();
                })
            }
        }
        setIsPlaying(true)
    }




    return (
        <div className={`songslist ${song.active ? 'selected' : ""}`} onClick={handleClick}
        // style={{ backgroundColor: data.color[0] }}
        >
            <img src={song.cover} alt={song.name} />
            <div>
                <h3>{song.name}</h3>
                <h5>{song.artist}</h5>
            </div>
        </div>
    )
}

export default SongList;

import React from 'react'
import SongList from './SongList'


function Library({ musicData, display, setDisplay, setCurrentSong, setIsPlaying, audioRef, isPlaying, setMusicData, playPauseButton, setPlayPauseButton }) {
    return (
        <div className={`library ${display ? "activeLibrary" : ""}`}
        // style={{ display: display, transition: "ease-in-out 2s" }}
        >
            {/* <h1>Library</h1> */}
            {
                musicData.map((data) => (
                    <div >
                        <SongList song={data} setMusicData={setMusicData} setCurrentSong={setCurrentSong} setIsPlaying={setIsPlaying} key={data.id} audioRef={audioRef} isPlaying={isPlaying} musicData={musicData} playPauseButton={playPauseButton} setPlayPauseButton={setPlayPauseButton} />
                    </div>
                ))
            }
        </div >
    )
}


export default Library

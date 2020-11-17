import React from 'react'
import SongList from './SongList'


function Library({ musicData, display, setDisplay, setCurrentSong, setIsPlaying, audioRef }) {
    return (
        <div className="library" style={{ display: display, transition: "ease-in-out 2s" }}>
            {musicData.map((data) => (
                <div >
                    <SongList song={data} setCurrentSong={setCurrentSong} setIsPlaying={setIsPlaying} key={data.id} audioRef={audioRef} />
                </div>
            ))}
        </div>
    )
}


export default Library

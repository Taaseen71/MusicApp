import React from 'react'


const Song = ({ musicData, currentSong }) => {
    console.log(musicData)
    return (
        <div className="song-container">
            <img src={currentSong.cover} alt={currentSong.name} />
            <div>
                <h2>{currentSong.name}</h2>
                <h4>{currentSong.artist}</h4>
            </div>
        </div>
    )
}

export default Song;
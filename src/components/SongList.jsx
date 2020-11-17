import React, { useRef } from 'react'


function SongList({ song, setCurrentSong, setIsPlaying, audioRef }) {


    const handleClick = async (e) => {
        e.preventDefault();
        setIsPlaying(false)
        await setCurrentSong(song);
        audioRef.current.play();
    }


    return (
        <div className="songslist" onClick={handleClick}
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

import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPlayCircle, faChevronCircleLeft, faChevronCircleRight, faPauseCircle } from "@fortawesome/free-solid-svg-icons"
function Player({ currentSong }) {
    return (
        <div className="player">
            <div className="time-control">
                <p> Start Time </p>
                <input type="range" />
                <p>End Time</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="previous" size="5x" icon={faChevronCircleLeft} />
                <FontAwesomeIcon className="play" size="5x" icon={faPlayCircle} />
                <FontAwesomeIcon className="pause" size="5x" icon={faPauseCircle} />
                <FontAwesomeIcon className="next" size="5x" icon={faChevronCircleRight} />
            </div>
        </div>
    )
}

export default Player

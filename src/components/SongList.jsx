import React from 'react'

function SongList({ musicData }) {
    return (
        <div>

            {musicData.map((data) => (
                <div>
                    <h3>
                        {data.name}
                    </h3>
                    <span>
                        <p>
                            {data.artist}
                        </p>
                    </span>
                </div>
            ))}

        </div>
    )
}

export default SongList;

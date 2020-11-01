import React from "react";
import {Link} from 'react-router-dom';

const SeasonCard = function ({season,showId}) {
    let seasonNumber = season.season_number<10 ? `S0${season.season_number}`: `S${season.season_number}`;
    let url = `/shows/${showId}/season/${season.season_number}`;
    return(
        <div className="mt-8">
            <Link to={url}>
                <img src={season.poster_path} alt="@season.name" className="hover:shadow-outline rounded transition ease-in-out duration-150" />
            </Link>
            <div className="mt-2">
                <Link to={url} className="text-lg mt-2 hover:text-gray:300">{season.name}</Link>
                <div className="text-sm text-gray-400">
                    <span className="text-lg font-semibold text-orange-500">
                        {seasonNumber}
                    </span>
                </div>
            </div>
        </div>
    )
}
export {SeasonCard};

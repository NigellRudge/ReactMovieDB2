import React from "react";
import {Link} from 'react-router-dom';

const SeasonCard = function (props) {
    let seasonNumber = props.season.season_number<10 ? `S0${props.season.season_number}`: `S${props.season.season_number}`;
    let url = '#';
    return(
        <div className="mt-8">
            <Link to={url}>
                <img src={props.season.poster_path} alt="@season.name" className="hover:opacity-75 transition ease-in-out duration-150" />
            </Link>
            <div className="mt-2">
                <Link to={url} className="text-lg mt-2 hover:text-gray:300">{props.season.name}</Link>
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

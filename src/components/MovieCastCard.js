import React from "react";
import {Link} from "react-router-dom";

const MovieCastCard = function({actor}) {
    let url = `/actors/${actor.id}`
    return(
        <div className="mt-8">
            <Link to={url}>
                <img src={actor.profile_path} alt="actor1"
                     className="hover:shadow-outline rounded transition ease-in-out duration-150" />
            </Link >
            <div className="mt-2">
                <Link to={url} className="hover:text-orange-500 transition duration-200 ease-in-out hover:font-semibold">{actor.name}</Link>
                <div className="font-semibold text-orange-400">
                    {actor.character}
                </div>
            </div>
        </div>
    );
}

export {MovieCastCard};

import React from "react";
import {Link} from "react-router-dom";

const MovieCastCard = function(props) {
    let url = `/actors/${props.actor.id}`
    return(
        <div className="mt-8">
            <Link to={url}>
                <img src={props.actor.profile_path} alt="actor1"
                     className="hover:shadow-outline rounded transition ease-in-out duration-150" />
            </Link >
            <div className="mt-2">
                <Link to={url} className="text-lg mt-2 hover:text-gray:300">{props.actor.name}</Link>
                <div className="text-sm text-gray-400">
                    {props.actor.character}
                </div>
            </div>
        </div>
    );
}

export {MovieCastCard};

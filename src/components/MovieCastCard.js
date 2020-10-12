import React from "react";

const MovieCastCard = function(props) {

    return(
        <div className="mt-8">
            <a href="">
                <img src={props.actor.profile_path} alt="actor1"
                     className="hover:opacity-75 transition ease-in-out duration-150" />
            </a>
            <div className="mt-2">
                <a href="" className="text-lg mt-2 hover:text-gray:300">{props.actor.name}</a>
                <div className="text-sm text-gray-400">
                    {props.actor.character}
                </div>
            </div>
        </div>
    );
}

export {MovieCastCard};

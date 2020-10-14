import React from "react";
import {MEDIA_TYPES} from "../utils/config";
import MovieCard from "./MovieCard";
import ShowCard from "./ShowCard";
import ActorCard from "./ActorCard";

const MediaContainer = function(props){
    let component = "";
    let max_width = props.max_width?props.max_width:null
    switch (props.type) {
        case MEDIA_TYPES.MOVIE:
            component = <MovieCard movie={props.item} max_width={max_width}/>
            break;
        case MEDIA_TYPES.SHOW:
            component = <ShowCard show={props.item} max_width={max_width} />
            break;
        case MEDIA_TYPES.ACTOR:
            component = <ActorCard actor={props.item} />
            break;
        default:
            component = <div>NO type Selected</div>;
    }
    return component;
}

export {MediaContainer}

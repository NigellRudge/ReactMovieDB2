import React from "react";
import {MEDIA_TYPES} from "../utils/config";
import MovieCard from "./MovieCard";
import ShowCard from "./ShowCard";
import ActorCard from "./ActorCard";

const MediaContainer = function({item,max_width,type}){
    let component = "";
    let width = max_width?max_width:null
    switch (type) {
        case MEDIA_TYPES.MOVIE:
            component = <MovieCard movie={item} max_width={width} showGenres={true}/>
            break;
        case MEDIA_TYPES.SHOW:
            component = <ShowCard show={item} max_width={width} />
            break;
        case MEDIA_TYPES.ACTOR:
            component = <ActorCard actor={item} />
            break;
        default:
            component = <div>NO type Selected</div>;
    }
    return component;
}

export {MediaContainer}

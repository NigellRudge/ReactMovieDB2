import {limitArray} from "../utils/functions";
import {MovieCastCard} from "./MovieCastCard";
import React from "react";

const CastComponent = function({cast}){
    cast = limitArray(cast,10)
    return <div className="movie-cast border-b border-gray-800">
        <div className="container mx-auto px-4 py-16">
            <h2 className="text-4xl font-semibold text-gray-100">Cast</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {cast.map((item,key) => {
                    return <MovieCastCard actor={item} key={key} />
                })}
            </div>
        </div>
    </div>
}

export {CastComponent}

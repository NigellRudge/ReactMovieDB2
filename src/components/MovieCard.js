import React from 'react';
import {Link} from 'react-router-dom';
import GenreList from "./GenreList";

const MovieCard = function ({movie,max_width}){
    let length = movie.genre_ids.length >= 3 ? 3: movie.genre_ids.length
    let url = `/movie/${movie.id}`;
    movie.genre_ids = movie.genre_ids.slice(0,length);
    let imgClass = 'rounded hover:shadow-outline  transition ease-in-out duration-150';
    if(max_width != null) {
        imgClass = `${imgClass} w-${max_width}`;
    }
    //console.log(movie)
    return (
        <div className="mt-8">
            <Link to={url}>
                <img src={movie.poster_path} alt="movie_image" className={imgClass} />
            </Link>
            <div className="mt-2">
                <Link to={url} className="text-lg mt-2 hover:text-gray-300">{movie.title}</Link>
                <div className="flex items-center text-gray-400 text-sm mt-1">
                    <svg className="fill-current text-orange-500 w-4" viewBox="0 0 24 24">
                        <g data-name="Layer 2">
                            <path
                                d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
                                data-name="star"/>
                        </g>
                    </svg>
                    <span className="ml-1">{movie.vote_average} %</span>
                    <span className="mx-2">|</span>
                    <span>{movie.release_date} </span>
                </div>
                <GenreList genres={movie.genre_ids} type={2} />
            </div>
        </div>
    );
}
export default MovieCard;


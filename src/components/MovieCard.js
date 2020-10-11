import React from 'react';
import {media_url} from '../utils/config';

const MovieCard = function (props){
    let length = props.movie.genre_ids.length >= 3 ? 3: props.movie.genre_ids.length
    props.movie.genre_ids = props.movie.genre_ids.slice(0,length);
    return (
        <div className="mt-8">
            <a href="#">
                <img src={props.movie.poster_path} alt="picture"
                     className="hover:opacity-75 transition ease-in-out duration-150" />
            </a>
            <div className="mt-2">
                <a href="#"
                   className="text-lg mt-2 hover:text-gray-300">{props.movie.title}</a>
                <div className="flex items-center text-gray-400 text-sm mt-1">
                    <svg className="fill-current text-orange-500 w-4" viewBox="0 0 24 24">
                        <g data-name="Layer 2">
                            <path
                                d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
                                data-name="star"/>
                        </g>
                    </svg>
                    <span className="ml-1">{ props.movie.vote_average} %</span>
                    <span className="mx-2">|</span>
                    <span>{props.movie.date} </span>
                </div>
                <div className="text-gray-400 text-sm">
                    {props.movie.genre_ids.map((item,key) => {
                        if(props.movie.genre_ids[key+1]){
                            return <span key={key}>{item.name}, </span>
                        }
                        else{
                            return <span key={key}>{item.name} </span>
                        }
                    })}
                </div>
            </div>
        </div>
    );
}
export default MovieCard;


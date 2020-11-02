import React, {useEffect, useState} from "react";
import {getMovieGenres, getMovieInfo, getSimilarMovies} from "../data/Movies";
import {SimilarItemsComponent} from "../components/SimilarItemsComponent";
import {ImagesComponent} from "../components/ImagesComponent";
import {CastComponent} from "../components/CastComponent";
import {TrailerComponent} from "../components/TrailerComponent";
import {CrewComponent} from "../components/CewComponent";
import GenreList from "../components/GenreList";
import PageLoading from "../components/PageLoading";
import {populateGenreArray} from "../utils/functions";

export default function MovieDetailPage({match}){
    const [loading,setLoading] = useState(true);
    const [movie,setMovie] = useState({})
    const [similarMovies,setSimilarMovies] = useState([])

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            getMovieInfo(match.params.movieId)
                .then(result => {
                    setMovie(result)
                }).then(()=>{
                    getSimilarMovies(match.params.movieId)
                        .then(result =>{
                            getMovieGenres()
                                .then(genres =>{
                                    let data = result.map(item =>{
                                        item.genre_ids = populateGenreArray(item.genre_ids,genres)
                                        return item
                                    })
                                    setSimilarMovies(data)
                                })

                        }).then(()=>{
                            setLoading(false)
                    })
                })

        },1000)
    },[match.params.movieId])

    let style = {
        height:'600px'
    }
    console.log(style)
    if(loading){
        return <PageLoading />
    }
    return(
        <div>
            <img alt="movie_cover" src={movie.backdrop_path} className="w-full h-auto object-cover" style={style} />
            <div className="border-b border-gray-800 ">
                <div className="bg-black absolute left-0 w-full top-0 bg-opacity-75 mt-20 pt-24 pb-12 pl-12 pr-12"  style={{height:'601px'}}>
                    <div className="flex flex-col md:flex-row" >
                        <div className="flex-none">
                            <img src={movie.poster_path} alt="poster" className="w-64 lg:w-96" />
                        </div>
                        <div className="md:ml-24">
                            <h2 className="text-4xl mt-4 md:mt-0 font-semibold">{movie.title}</h2>
                            <div className="flex flex-wrap items-center text-gray-400 text-sm">
                                <svg className="fill-current text-orange-500 w-4" viewBox="0 0 24 24"><g data-name="Layer 2"><path d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z" data-name="star" /></g></svg>
                                <span className="ml-1">{movie.vote_average}</span>
                                <span className="mx-2">|</span>
                                <span>{movie.release_date}</span>
                                <span className="mx-2">|</span>
                                <GenreList genres={movie.genres} type={1}/>
                            </div>

                            <p className="text-gray-300 mt-12">
                                {movie.overview}
                            </p>

                            <CrewComponent crew={movie.credits.crew} />
                            <TrailerComponent />
                        </div>
                    </div>
                </div>

            </div>
            <div className="mt-12">
                <CastComponent cast={movie.credits.cast} />
                <ImagesComponent images={movie.images.backdrops} />
                <SimilarItemsComponent items={similarMovies} type={1} />
            </div>
        </div>
    );

}

import React, {useEffect, useState} from 'react';
import {getMovieGenres, getNowPlayingMovies} from '../data/Movies';
import {MediaContainer} from "../components/MediaContainer";
import {MEDIA_TYPES} from "../utils/config";
import {getNowAiringShows, getShowGenres} from "../data/Shows";
import SkeletonCardList from "../components/SkeletonCardList";
import {populateGenreArray} from "../utils/functions";

export default function TrendingPage(){
    const [loading,setLoading] = useState(true);
    const [nowAiringShows,setNowAiringShows] = useState([]);
    const [nowPlayingMovies,setNowPlayingMovies] = useState([]);

    useEffect(()=>{
        setTimeout(()=>{
            getMovieGenres()
                .then(movieGenres =>{
                    getNowPlayingMovies().then(result => {
                        let data = result.map(item =>{
                            item.genre_ids = populateGenreArray(item.genre_ids,movieGenres)
                            return item;
                        })
                        setNowPlayingMovies(data)
                    }).then(()=>{
                        getNowAiringShows().then(result => {
                            getShowGenres()
                                .then(showGenres =>{
                                    let data = result.map(item =>{
                                        item.genre_ids = populateGenreArray(item.genre_ids,showGenres)
                                        return item;
                                    })
                                    setNowAiringShows(data)
                                })
                        }).then(()=>{
                            setLoading(false)
                        })
                    })
                })
        },1200)
    },[])

    if(loading){
        return(
            <div>
                <SkeletonCardList title="Now Playing" />
                <SkeletonCardList title="Now Airing" />
            </div>
        )
    }
    return(
        <div>
            <div className="container mx-auto px-4 pt-10">
                <div className="popular-movies">
                    <h2 className="uppercase tracking-wider text-gray-100 text-lg font-bold">
                        Now Playing
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {nowPlayingMovies.map((movie,key) =>{
                                return <MediaContainer type={MEDIA_TYPES.MOVIE} item={movie} key={key} />
                            }
                         )}
                    </div>
                </div>

                <div className="popular-movies py-24">
                    <h2 className="uppercase tracking-wider  text-gray-100 text-lg font-bold">
                        Now Airing
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {nowAiringShows.map((movie,key) =>{
                            return <MediaContainer type={MEDIA_TYPES.SHOW} item={movie} key={key} />
                            }
                         )}
                    </div>
                </div>
            </div>
        </div>
        );

}


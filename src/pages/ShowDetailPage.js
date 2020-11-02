import React, { useEffect, useState} from "react";
import {CastComponent} from "../components/CastComponent";
import {ImagesComponent} from "../components/ImagesComponent";
import {SimilarItemsComponent} from "../components/SimilarItemsComponent";
import {TrailerComponent} from "../components/TrailerComponent";
import {CrewComponent} from "../components/CewComponent";
import {SeasonsComponent} from "../components/SeasonsComponent";
import PageLoading from "../components/PageLoading";
import GenreList from "../components/GenreList";
import {getShow, getShowGenres, getSimilarShows} from "../data/Shows";
import {populateGenreArray} from "../utils/functions";

export default function ShowDetailPage (props){
    const [show,setShow] = useState({})
    const [similarShows,setSimilarShows] = useState([])
    const [loading,setLoading] = useState(true);


    const fetchData = async ()=>{
        await setTimeout(()=>{
            getShow(props.match.params.showId)
                .then(result => {
                    setShow(result)
                })
                .then(()=>{
                    getSimilarShows(props.match.params.showId)
                        .then(result => {
                            getShowGenres()
                                .then(genres => {
                                    let data = result.map(item =>{
                                        item.genre_ids = populateGenreArray(item.genre_ids,genres)
                                        return item;
                                    })
                                    setSimilarShows(data)
                                })
                        })
                        .then(()=>{
                            setLoading(false)
                        })
                })

        },1000)
    }

    useEffect(()=>{
        console.log('effect called')
        setLoading(true)
        fetchData()
    },[props.match.params.showId])
    console.log(show)
    let style = {
        height:'600px'
    }
    if(loading){
        return <PageLoading />
    }
    return (
        <div>
            <img alt="movie_cover" src={show.backdrop_path} className="w-full h-auto object-cover" style={style} />
            <div className="border-b border-gray-800 ">
                <div className="bg-black absolute left-0 w-full top-0 bg-opacity-75 mt-20 pt-24 pb-12 pl-12 pr-12" style={{height:'601px'}}>
                    <div className="flex flex-col md:flex-row" >
                    <div className="flex-none">
                        <img src={show.poster_path} alt="poster"  className="w-64 lg:w-96" />
                    </div>
                    <div className="md:ml-24">
                        <h2 className="text-4xl mt-4 md:mt-0 font-semibold">{show.original_name}</h2>
                        <div className="flex flex-wrap items-center text-gray-400 text-sm">
                            <svg className="fill-current text-orange-500 w-4" viewBox="0 0 24 24">
                                <g data-name="Layer 2">
                                    <path
                                        d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
                                        data-name="star"/>
                                </g>
                            </svg>
                            <span className="ml-1">{show.vote_average}</span>
                            <span className="mx-2">|</span>
                            <span>{show.first_air_date}</span>
                            <span className="mx-2">|</span>
                            <GenreList genres={show.genres} type={1}/>
                        </div>

                        <p className="text-gray-300 mt-8">
                            {show.overview}
                        </p>

                        <CrewComponent crew={show.credits.crew} />
                        <TrailerComponent />

                    </div>
                </div>
            </div>
            <CastComponent cast={show.credits.cast} />
            <SeasonsComponent seasons={show.seasons} moreSeasonUrl="#" showId={show.id} />
            <ImagesComponent images={show.images.backdrops} />
            <SimilarItemsComponent items={similarShows} type={2} />
        </div>
        </div>
    );
}














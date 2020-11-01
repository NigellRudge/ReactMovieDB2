import React, {useEffect, useState} from 'react';
import {TrailerComponent} from "../components/TrailerComponent";
import {CrewComponent} from "../components/CewComponent";
import {CastComponent} from "../components/CastComponent";
import {ImagesComponent} from "../components/ImagesComponent";
import PageLoading from "../components/PageLoading";
import {getEpisodeInfo} from "../data/Shows";

export default  function EpisodeDetailPage({match}){
    const [loading,setLoading] = useState(true)
    const [showId] = useState(match.params.showId)
    const [seasonId] = useState(match.params.seasonId)
    const [episodeId] = useState(match.params.episodeId)
    const [episode,setEpisode] = useState({})

    useEffect(()=>{
        setLoading(true)
        getEpisodeInfo(showId, seasonId,episodeId)
            .then(result => {
               setEpisode(result)
            })
            .then(()=>{
                setLoading(false)
            })
    },[])

    if(loading){
        return <PageLoading />
    }
    return(
        <div>
            <div className=" border-b border-gray-800">
                <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row">
                    <div className="flex-none ">
                        <img src={episode.still_path} alt="season_poster" className="" />
                    </div>
                    <div className="md:ml-24">
                        <h2 className="text-4xl mt-4 md:mt-0 font-semibold">{episode.name}</h2>
                        <div className="flex flex-wrap items-center text-gray-400 text-sm">
                            <svg className="fill-current text-orange-500 w-4" viewBox="0 0 24 24"><g data-name="Layer 2"><path d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z" data-name="star" /></g></svg>
                            <span className="ml-1">{episode.vote_average}</span>
                            <span className="mx-2">|</span>
                            <span>{episode.air_date}</span>
                            <span className="mx-2">|</span>
                        </div>
                        <p className="text-gray-300 mt-8">
                            {episode.overview}
                        </p>
                        <CrewComponent crew={episode.crew} />
                        <TrailerComponent />
                    </div>
                </div>

                <CastComponent cast={episode.guest_stars} />
                <ImagesComponent images={episode.images.stills} />
            </div>
        </div>
    );

}

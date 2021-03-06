import React, { useEffect, useState} from "react";
import {TrailerComponent} from "../components/TrailerComponent";
import {EpisodeComponent} from "../components/EpisodeComponent";
import PageLoading from "../components/PageLoading";
import {getSeasonInfo} from "../data/Shows";


export default function SeasonDetailPage ({match}){
    const [season,setSeason] = useState({})
    const [loading,setLoading] = useState(true)
    const [showId] = useState(match.params.showId)
    const [seasonId] = useState(match.params.seasonId)


    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            getSeasonInfo(showId,seasonId)
                .then(result => {
                   setSeason(result)
                })
                .then(()=>{
                    setLoading(false)
                })
        },1000)
    },[])

    if(loading){
        return <PageLoading />
    }
    else {
        return (<div>
                <div className=" border-b border-gray-800">
                    <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row">
                        <div className="flex-none ">
                            <img src={season.poster_path} alt="season_poster" className="w-64 lg:w-96" />
                        </div>
                        <div className="md:ml-24">
                            <h2 className="text-4xl mt-4 md:mt-0 font-semibold">{season.name}</h2>
                            <div className="flex flex-wrap items-center text-gray-400 text-sm">
                                <svg className="fill-current text-orange-500 w-4" viewBox="0 0 24 24"><g data-name="Layer 2"><path d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z" data-name="star" /></g></svg>
                                <span className="ml-1">80</span>
                                <span className="mx-2">|</span>
                                <span>{season.air_date}</span>
                                <span className="mx-2">|</span>
                            </div>
                            <p className="text-gray-300 mt-8">
                                {season.overview}
                            </p>
                            <TrailerComponent />
                        </div>
                    </div>
                </div>

                <EpisodeComponent episodes={season.episodes} showId={showId} seasonId={seasonId} />
            </div>
        );
    }

}

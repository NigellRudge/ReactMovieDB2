import React, {useEffect, useState} from "react";
import PageLoading from "../components/PageLoading";
import {TrailerComponent} from "../components/TrailerComponent";
import MovieCard from "../components/MovieCard";
import {ImagesComponent} from "../components/ImagesComponent";
import {getActorInfo, getActorRoles} from "../data/Actors";

export function ActorDetailPage({match}) {
    const [loading,setLoading] = useState(true)
    const [actor,setActor] = useState({})
    const [roles,setRoles] = useState([])

    useEffect(()=>{
        getActorInfo(match.params.actorId)
            .then(result =>{
                setActor(result)
            })
            .then(()=>{
                getActorRoles(match.params.actorId)
                    .then((result)=>{
                        setRoles(result)
                    })
                    .then(()=>{
                        setLoading(false)
                    })
            })

    }, [match.params.actorId])

    if(loading){
        return <PageLoading />
    }
    return <div>
                <div className="movie-info border-b border-gray-800">
                    <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row">
                        <div className="flex-none">
                            <img src={actor.profile_path} alt="poster" className="w-64 lg:w-96" />
                        </div>
                        <div className="md:ml-24">
                            <h2 className="text-4xl mt-4 md:mt-0 font-semibold">{actor.name}</h2>
                            <div className="flex flex-wrap items-center text-gray-400 text-sm">
                                <svg className="fill-current text-orange-500 w-4" viewBox="0 0 24 24"><g data-name="Layer 2"><path d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z" data-name="star" /></g></svg>
                                <span className="ml-1">{actor.popularity}</span>
                                <span className="mx-2">|</span>
                                <span>{actor.birthday}</span>
                                <span className="mx-2">|</span>
                            </div>

                            <p className="text-gray-300 mt-8">
                                {actor.biography}
                            </p>


                            <TrailerComponent />
                        </div>
                    </div>
                </div>

                <div className="movie-cast border-b border-gray-800">
                    <div className="container mx-auto px-4 py-16">
                        <h2 className="text-4xl font-semibold text-orange-500">Popular Roles</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                            {roles.map((item,key) => {
                                return <MovieCard movie={item} key={key} showGenres={false} />
                            })}
                        </div>
                    </div>
                </div>

                <ImagesComponent images={actor.images.profiles} />
            </div>
}

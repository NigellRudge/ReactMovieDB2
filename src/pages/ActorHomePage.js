import React, {useEffect, useState} from 'react';
import {getPopularActors} from "../data/Actors";
import {MediaContainer} from "../components/MediaContainer";
import {MEDIA_TYPES} from "../utils/config";
import SkeletonCardList from "../components/SkeletonCardList";

export default function ActorHomePage(props) {
    const [loading,setLoading] = useState(true)
    const [popularActors,setActors] = useState([])

    useEffect(()=>{
        setTimeout(()=>{
           getPopularActors()
                .then(result => {
                    setActors(result)
                })
                .then(()=>{
                    setLoading(false)
                })
        }, 1200)
    },[])


    if(loading){
        return(
            <div>
                <SkeletonCardList title="popular actors" />
            </div>
        )
    }
    else {
        return (
            <div className="container mx-auto px-4 pt-16">
                <div className="popular-actors">
                    <h2 className="uppercase tracking-wider text-xl text-gray-200 text-lg font-bold">Popular actors</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {popularActors.map((actor,key)=>{
                            return <MediaContainer type={MEDIA_TYPES.ACTOR} item={actor} key={key}/>
                        })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

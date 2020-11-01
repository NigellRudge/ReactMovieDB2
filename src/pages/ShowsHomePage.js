import React, {useEffect, useState} from 'react';
import {getNowAiringShows, getTopRatedShows} from '../data/Shows';
import {MediaContainer} from "../components/MediaContainer";
import {MEDIA_TYPES} from "../utils/config";
import SkeletonCardList from "../components/SkeletonCardList";

export default function ShowsHomePage (props){

    const [loading,setLoading] = useState(true);
    const [nowAiringShows,setNowAiring] = useState([]);
    const [topRatedShows,setTopRated] = useState([]);


    useEffect(()=>{
        setTimeout(()=>{
            getNowAiringShows()
                .then(result => {
                    setNowAiring(result)
                })
                .then(()=>{
                    getTopRatedShows()
                        .then(result => {
                            setTopRated(result)
                        })
                        .then(()=>{
                            setLoading(false)
                        });
                });
        },1200)
    },[])

    if(loading){
        return(
            <div>
                <SkeletonCardList title="Popular Shows" />
                <SkeletonCardList title="Now Airing" />
            </div>
        )
    }
    else {
        return(
                <div className="container mx-auto px-4 pt-10">
                    <div className="popular-movies">
                        <h2 className="uppercase tracking-wider text-gray-100 text-lg font-bold">
                            Popular Shows
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                            {nowAiringShows.map((show,key) =>{
                                    return <MediaContainer item={show} type={MEDIA_TYPES.SHOW} key={key} />
                                }
                             )}
                        </div>
                    </div>


                    <div className="popular-movies py-24">
                        <h2 className="uppercase tracking-wider text-gray-100 text-lg font-bold">
                            Now Airing
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                            {topRatedShows.map((show,key) =>{
                                return <MediaContainer item={show} type={MEDIA_TYPES.SHOW} key={key} />
                                }
                             )}
                        </div>
                    </div>
                </div>
        );
    }
}

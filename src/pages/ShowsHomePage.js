import React, {useEffect, useState} from 'react';
import ShowService from '../services/ShowService';
import {MediaContainer} from "../components/MediaContainer";
import {MEDIA_TYPES} from "../utils/config";
import SkeletonCardList from "../components/SkeletonCardList";

export default function ShowsHomePage (props){

    const [loading,setLoading] = useState(true);
    const [nowAiringShows,setNowAiring] = useState([]);
    const [topRatedShows,setTopRated] = useState([]);


    useEffect(()=>{
        let service = new ShowService();
        setTimeout(()=>{
            service.getNowAiringShows()
                .then(result => {
                    setNowAiring(result)
                })
                .then(()=>{
                    service.getTopRatedShows()
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
                        <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">
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
                        <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">
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

import {limitArray} from "../utils/functions";
import {Link} from "react-router-dom";
import {SeasonCard} from "./SeasonCard";
import React from "react";

const SeasonsComponent = function(props){
    let seasonArray = limitArray(props.seasons,5);
    return  <div className="show-cast border-b border-gray-800">
        <div className="container mx-auto px-4 py-16">
            <div className="flex justify-between">
                <h2 className="text-4xl font-semibold">Seasons</h2>
                <div className="text-4xl font-semibold">
                    <Link className="hover:text-orange-500 hover:underline" to={props.moreSeasonUrl}>
                        More+
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {seasonArray.map((item,key) => {
                    return <SeasonCard season={item} key={key} />
                })}
            </div>
        </div>
    </div>
}
export {SeasonsComponent}

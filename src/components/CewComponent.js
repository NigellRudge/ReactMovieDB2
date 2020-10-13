import {limitArray} from "../utils/functions";
import React from "react";

const CrewComponent = function(props){
    let crewCount = 4;
    let crewArray = limitArray(props.crew,crewCount)
    return <div className="mt-12">
        <h4 className="text-white font-semibold">Featured Crew</h4>
        <div className="flex mt-4">
            {crewArray.map((item,key) => {
                return (<div className="mr-8"  key={key}>
                    <div>{item.name}</div>
                    <div className="text-sm text-gray-400">{item.job}</div>
                </div>);

            })}
        </div>
    </div>
}
export {CrewComponent};

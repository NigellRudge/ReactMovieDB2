import React from "react";
import {Link} from "react-router-dom";

const EpisodeComponent = function (props) {
    let url = `/shows/${props.showId}/season/${props.seasonId}/episode/`;
    return(
        <div className="show-cast border-b border-gray-800">
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-4xl font-semibold">Episodes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {props.episodes.map((item, key) => {
                        console.log(`url: ${url+item.episode_number}`)
                            return (<div className="mt-8" key={key}>
                                        <Link to={url+item.episode_number}>
                                            <img src={item.still_path} alt={item.name} className="hover:opacity-75 transition ease-in-out duration-150" />
                                        </Link>
                                        <div className="mt-2">
                                            <Link to={url+item.episode_number} className="text-lg mt-2 hover:text-gray:300">{item.id}</Link>
                                            <div className="text-sm text-gray-400">{item.name}</div>
                                        </div>
                                    </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}
export {EpisodeComponent};

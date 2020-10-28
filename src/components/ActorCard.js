import React from 'react';
import {Link} from "react-router-dom";
import {limitArray} from "../utils/functions";

const ActorCard = function(props){
        let url = `/actors/${props.actor.id}`;
        props.actor.known_for = limitArray(props.actor.known_for,3)
        let occupation = "";
        switch (props.actor.known_for_department.toLowerCase()) {
            case "acting":
                occupation = props.actor.gender === 2 ? "Actor" : "Actress";
                break;
            case "directing":
                occupation = 'Director';
                break;
            case "production":
                occupation = "Producer";
                break;
            default:
                occupation = '';
                break;
        }
        return (
            <div className="mt-8">
                <Link to={url}>
                <img src={props.actor.profile_path} alt="actor_image" className="hover:shadow-outline rounded transition ease-in-out duration-150" />
                </Link>
                <div className="mt-2">
                    <Link to={url} className="text-lg mt-2 hover:text-orange-500 hover:font-semibold">{props.actor.name}</Link>
                    <div className="flex items-center text-gray-400 text-sm mt-1">
                        <svg className="fill-current text-orange-500 w-4" viewBox="0 0 24 24"><g data-name="Layer 2"><path d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z" data-name="star" /></g></svg>
                        <span className="ml-1">{props.actor.popularity}</span>
                        <span className="mx-2">|</span>
                        <span>{occupation}</span>
                    </div>
                    <div className="text-gray-400 text-sm">
                        {props.actor.known_for.map((item,key) => {
                            let tempUrl = `/movie/${item.id}`;
                            if(!props.actor.known_for[key+1]){

                                return <Link to={tempUrl} key={key}>
                                    <span key={key} className="mr-1 hover:font-semibold hover:text-orange-500">{item.title}</span>
                                </Link>
                            }
                            return <Link to={tempUrl} key={key}>
                                <span key={key} className="mr-1 hover:font-semibold hover:text-orange-500">{item.title},</span>
                            </Link>
                        })}
                    </div>
                </div>
            </div>
        );
}
export default ActorCard;

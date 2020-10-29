import React from "react";
import {Link} from "react-router-dom";



export default function GenreList({genres,type=1}){
    if(type === 1){
        return <div>
            {genres.map((item,key) => {
                return <div key={key} className="text-black inline">
                    <GenreBullet genre={item.name}  />
                </div>
            })}
        </div>
    }
    return(
        <div className="text-black py-1 flex flex-wrap">
            {genres.map((item,key)=>{
                return <GenreBullet genre={item.name} key={key}/>
            })}
    </div>
    );
}

function GenreBullet ({genre}) {
    let url = `#`;
    return(
        <Link className="mt-2" to={url}>
            <span className="hover:bg-orange-600 hover:font-semibold hover:text-white transition transition duration-200 ease-in-out bg-orange-500  text-xs rounded-lg px-2 py-1 mr-1">
                {genre}
            </span>
        </Link>
    );
}

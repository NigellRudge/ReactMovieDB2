import React from "react";
import {Link} from "react-router-dom";



export default function GenreList({genres,type=1}){
    if(type === 1){
        return <div>
            {genres.map((item,key) => {
                return <GenreBullet genre={item.name} />
            })}
        </div>
    }
    return(
        <div className="text-gray-400 text-sm py-1 flex flex-wrap">
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
            <span className="hover:bg-orange-600 hover:font-semibold bg-orange-700 text-xs rounded-lg px-2 py-1 mr-1">
                {genre}
            </span>
        </Link>
    );
}

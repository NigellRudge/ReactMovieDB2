import React from "react";
import {Link} from "react-router-dom";

const TrailerComponent = function (props) {
    let url = '#';
    return <div className="mt-12">
        <Link to={url}
           className="flex inline-flex items-center bg-red-1000 text-gray-100 hover:text-white rounded font-semibold px-5 py-4 hover:bg-red-1010 transition ease-in-out duration-150">
            <svg className="w-6 fill-current" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
            <span className="ml-2">Play Trailer</span>
        </Link>
    </div>
}

export {TrailerComponent};

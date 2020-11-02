import {Link} from "react-router-dom";
import React from "react";

const MoreContentComponent = function({active,moreUrl}){
    if(!active){
        return <div></div>;
    }
    return <div className="text-4xl font-semibold">
        <Link className="hover:text-red-1010 hover:underline" to={moreUrl}>
            More+
        </Link>
    </div>
}
export {MoreContentComponent}

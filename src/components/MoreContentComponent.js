import {Link} from "react-router-dom";
import React from "react";

const MoreContentComponent = function(props){
    if(!props.active){
        return <div></div>;
    }
    return <div className="text-4xl font-semibold">
        <Link className="hover:text-orange-500 hover:underline" to={props.moreUrl}>
            More+
        </Link>
    </div>
}
export {MoreContentComponent}

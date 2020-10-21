import React from 'react';
import Skeleton from "react-loading-skeleton";

export default  function SkeletonCard(props){
    let width = 250;
    let height = 370;
    let duration = 1.8;
    return (
        <div className="mt-8">
            <Skeleton height={height} duration={duration} width={width} />
        </div>
    );
}

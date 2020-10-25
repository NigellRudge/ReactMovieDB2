import React from "react";
import {SkeletonTheme} from "react-loading-skeleton";
import SkeletonCard from "./SkeletonCard";

export default function SkeletonCardList({title}) {
    let data = Array(20).fill();

    return (
        <SkeletonTheme color="#aaabad" highlightColor="#f5f4f2" >
            <div className="container mx-auto px-4 pt-10">
                <div className="popular-movies">
                    <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">
                        {title}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {data.map((movie,key) =>{
                                return <SkeletonCard  key={key}/>
                            }
                        )}
                    </div>
                </div>
            </div>
        </SkeletonTheme>

    );
}

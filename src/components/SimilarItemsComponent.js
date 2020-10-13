import ShowCard from "./ShowCard";
import React from "react";

const SimilarItemsComponent = function(props){
    if(props.items.length > 0){
        return <div className="movie-images">
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-4xl font-semibold">Similar Content</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" id="galleryGrid">
                    {props.items.map((item,key) => {
                        return(
                            <ShowCard show={item} key={key} max_width='64' />
                        );
                    })}
                </div>
            </div>
        </div>
    }
    return <div></div>;
}
export {SimilarItemsComponent};

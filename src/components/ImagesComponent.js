import {limitArray} from "../utils/functions";
import React from "react";

const ImagesComponent = function (props) {
    let imageCount = 10;
    let imageArray = limitArray(props.images,imageCount)
    return <div className="movie-images border-b border-gray-800">
        <div className="container mx-auto px-4 py-16">
            <h2 className="text-4xl font-semibold">Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" id="galleryGrid">
                {imageArray.map((item,key) => {
                    return(
                        <div className="mt-8" id="galleryImage" key={key}>
                            <img src={item.file_path} alt="image1" className="hover:shadow-outline rounded transition ease-in-out duration-150" />
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
}

export {ImagesComponent}

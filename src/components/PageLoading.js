import React from "react";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

export  default function PageLoading () {
    return(
        <div>
            <SkeletonTheme color="#aaabad" highlightColor="#f5f4f2" >
            <div className="movie-info border-b border-gray-800">
                <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row">
                    <div className="flex-none">
                        <Skeleton className="w-64 lg:w-96" duration={1} width={280} height={400} />
                    </div>
                    <div className="md:ml-24">
                        <Skeleton height={60} width={400} duration={1} />
                        <div className="flex flex-wrap items-center text-gray-400 text-sm">

                        </div>

                        <p className="text-gray-300 mt-4">
                            <Skeleton width={400} height={280} />
                        </p>


                    </div>
                </div>
            </div>

            <div className="movie-cast border-b border-gray-800">
                <div className="container mx-auto px-4 py-16">
                    <h2 className="text-4xl font-semibold text-orange-500">Cast</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                        {Array(10).fill().map(()=>{
                            return  <div className="mt-8">
                                        <Skeleton height={350} duration={1} width={220} />
                                    </div>
                        })}
                    </div>
                </div>
            </div>

                <div className="movie-images border-b border-gray-800">
                    <div className="container mx-auto px-4 py-16">
                        <h2 className="text-4xl font-semibold">Images</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" id="galleryGrid">
                            {Array(9).fill().map(() => {
                                return(
                                    <div className="mt-8" id="galleryImage">
                                        <Skeleton width={400} height={200} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </SkeletonTheme>
        </div>
    );
}

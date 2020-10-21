import React from 'react';
import MovieService from '../services/MovieService';
import {MediaContainer} from "../components/MediaContainer";
import {MEDIA_TYPES} from "../utils/config";
import ShowService from "../services/ShowService";
import SkeletonCardList from "../components/SkeletonCardList";

class TrendingPage extends React.Component {
    constructor(){
        super();
        this.state = {
            nowAiringShows: null,
            nowPlayingMovies: null,
            loading: true
        }
    }

    async componentDidMount(){
        let movieService = new MovieService();
        let showService = new ShowService();

        setTimeout(()=>{
             movieService.getNowPlayingMovies().then(result => {
                this.setState ({
                    nowPlayingMovies: result,
                })
            })
             showService.getNowAiringShows().then(result => {
                this.setState ({
                    nowAiringShows: result,
                    loading:false
                })
            })
        }, 1500)

    }

    async getMovieData(){

    }

    render() {
            return(
                <div>
                    {this.state.loading &&
                    <div>
                        <SkeletonCardList title="Now Playing" />
                        <SkeletonCardList title="Now Airing" />
                    </div>
                    }

                    {!this.state.loading &&
                    <div className="container mx-auto px-4 pt-10">
                        <div className="popular-movies">
                            <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">
                                Now Playing
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                {this.state.nowPlayingMovies.map((movie,key) =>{
                                        return <MediaContainer type={MEDIA_TYPES.MOVIE} item={movie} key={key} />
                                    }
                                 )}
                            </div>
                        </div>

                        <div className="popular-movies py-24">
                            <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">
                                Now Airing
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                {this.state.nowAiringShows.map((movie,key) =>{
                                    return <MediaContainer type={MEDIA_TYPES.SHOW} item={movie} key={key} />
                                    }
                                 )}
                            </div>
                        </div>
                    </div>}
                </div>
            );
        }
}

export default TrendingPage;
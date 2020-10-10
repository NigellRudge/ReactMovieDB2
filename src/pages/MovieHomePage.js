import React from 'react';
import MovieService from '../services/MovieService';
import MovieCard from '../components/MovieCard/MovieCard';

class MovieHomePage extends React.Component {
    constructor(){
        super();
        this.state = {
            popularMovies: null,
            nowPlayingMovies: null,
            loading: true
        }
    }

    componentDidMount(){
        let service = new MovieService();
        service.getPopularMovies().then(result => {
        console.log(result.data.results)
            this.setState ({
                popularMovies: result.data.results,
                //loading:false
            })

        })
        service.getNowPlayingMovies().then(result => {
        console.log(result.data.results)
            this.setState ({
                nowPlayingMovies: result.data.results,
                loading:false
            })

        })
    }

    render() {
        if(this.state.loading){
            return <h1>loading</h1>
        }
        else {
                    return(
                            <div className="container mx-auto px-4 pt-10">
                                <div className="popular-movies">
                                    <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">
                                        Popular Movies
                                    </h2>
                                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                        {this.state.popularMovies.map((movie,key) =>{
                                                return <MovieCard movie={movie} key={key}></MovieCard>
                                            }
                                         )}
                                    </div>
                                </div>


                                <div className="popular-movies py-24">
                                    <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">
                                        Now Playing
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                        {this.state.nowPlayingMovies.map((movie,key) =>{
                                                return <MovieCard movie={movie} key={key}></MovieCard>
                                            }
                                         )}
                                    </div>
                                </div>
                            </div>
                    );
        }

    }

}

export default MovieHomePage;

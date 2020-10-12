import React, {Component} from "react";
import MovieService from "../services/MovieService";
import {MovieCastCard} from "../components/MovieCastCard";
import MovieCard from "../components/MovieCard";
import {limitArray} from "../utils/functions";

export default class MovieDetailPage extends Component{
    constructor(props) {
        super(props);
        this.service = new MovieService();
        const {match:{params}} = this.props;
        this.state = {
            movieId:params.movieId,
            movie:null,
            loading:true,
            similarMovies:[]
        }
    }
    componentDidMount() {
        console.log(this.state.movieId)
        console.log('calling did mount')
        this.loadData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.movieId !== prevState.movieId){
            this.loadData();
        }
    }

    static getDerivedStateFromProps(nextProps,prevState){
        if(nextProps.match.params.movieId !== prevState.movieId){
            console.log(nextProps.match.params.movieId)
            return {
                movieId: nextProps.match.params.movieId,
                loading:true,
            }
        }
        else {
            return null;
        }
    }

    loadData(){
        this.service.getMovieInfo(this.state.movieId)
            .then(result => {
                this.setState({
                    movie:result,
                    loading:false
                })
            })
        this.service.getSimilarMovies(this.state.movieId)
            .then(result =>{
                this.setState({
                    similarMovies: result
                })
            })
    }

    render() {
        if(this.state.loading){
            return <h1>Loading</h1>
        }
        else {
            let similarMovies = null;
            let playAction = null;
            if(this.state.similarMovies.length > 0 ){
                 similarMovies = <div className="movie-images">
                                        <div className="container mx-auto px-4 py-16">
                                            <h2 className="text-4xl font-semibold">Similar Movies</h2>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" id="galleryGrid">
                                                {this.state.similarMovies.map((item,key) => {
                                                    return(
                                                        <MovieCard movie={item} key={key} max_width='64' />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
            }
            else {
                similarMovies = <div></div>;
            }
            let crewCount = 4;
            let castCount = 10;
            let imageCount = 10;
            let crewArray = limitArray(this.state.movie.credits.crew,crewCount)
            let castArray = limitArray(this.state.movie.credits.cast,castCount)
            let imageArray = limitArray(this.state.movie.images.backdrops,imageCount)
            return(
                <div>
                    <div className="movie-info border-b border-gray-800">
                        <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row">
                            <div className="flex-none">
                                <img src={this.state.movie.poster_path} alt="poster" className="w-64 lg:w-96" />
                            </div>
                            <div className="md:ml-24">
                                <h2 className="text-4xl mt-4 md:mt-0 font-semibold">{this.state.movie.title}</h2>
                                <div className="flex flex-wrap items-center text-gray-400 text-sm">
                                    <svg className="fill-current text-orange-500 w-4" viewBox="0 0 24 24"><g data-name="Layer 2"><path d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z" data-name="star" /></g></svg>
                                    <span className="ml-1">{this.state.movie.vote_average}</span>
                                    <span className="mx-2">|</span>
                                    <span>{this.state.movie.release_date}</span>
                                    <span className="mx-2">|</span>
                                    {this.state.movie.genres.map((item,key) => {
                                        if(!this.state.movie.genres[key+1]){
                                            return <span className="ml-1" key={key}>{item.name}</span>
                                        }
                                        else {
                                            return <span className="ml-1" key={key}>{item.name},</span>
                                        }
                                    })}
                                </div>

                                <p className="text-gray-300 mt-8">
                                    {this.state.movie.overview}
                                </p>

                                <div className="mt-12">
                                    <h4 className="text-white font-semibold">Featured Crew</h4>
                                    <div className="flex mt-4">
                                        {crewArray.map((item,key) => {
                                            return (<div className="mr-8"  key={key}>
                                                <div>{item.name}</div>
                                                <div className="text-sm text-gray-400">{item.job}</div>
                                            </div>);

                                        })}
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-12">
                                        <a href="#"
                                           className="flex inline-flex items-center bg-orange-500 text-gray-900 rounded font-semibold px-5 py-4 hover:bg-orange-600 transition ease-in-out duration-150">
                                            <svg className="w-6 fill-current" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
                                            <span className="ml-2">Play Trailer</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="movie-cast border-b border-gray-800">
                        <div className="container mx-auto px-4 py-16">
                            <h2 className="text-4xl font-semibold">Cast</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                {castArray.map((item,key) => {
                                    return <MovieCastCard actor={item} key={key} />
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="movie-images border-b border-gray-800">
                        <div className="container mx-auto px-4 py-16">
                            <h2 className="text-4xl font-semibold">Images</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" id="galleryGrid">
                                {imageArray.map((item,key) => {
                                    return(
                                        <div className="mt-8" id="galleryImage" key={key}>
                                            <img src={item.file_path} alt="image1" className="hover:opacity-75 transition ease-in-out duration-150" />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {similarMovies}
                </div>
            );
        }
    }
}

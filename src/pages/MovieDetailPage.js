import React, {Component} from "react";
import MovieService from "../services/MovieService";
import {SimilarItemsComponent} from "../components/SimilarItemsComponent";
import {ImagesComponent} from "../components/ImagesComponent";
import {CastComponent} from "../components/CastComponent";
import {TrailerComponent} from "../components/TrailerComponent";
import {CrewComponent} from "../components/CewComponent";

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

                            <CrewComponent crew={this.state.movie.credits.crew} />
                            <TrailerComponent />
                        </div>
                    </div>
                </div>

                <CastComponent cast={this.state.movie.credits.cast} />
                <ImagesComponent images={this.state.movie.images.backdrops} />
                <SimilarItemsComponent items={this.state.similarMovies} type={1} />
            </div>
        );
    }
}

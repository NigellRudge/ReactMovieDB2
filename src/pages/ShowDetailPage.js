import React, {Component} from "react";
import ShowService from "../services/ShowService";
import {MovieCastCard} from "../components/MovieCastCard";
import {limitArray} from "../utils/functions";
import ShowCard from "../components/ShowCard";
import {SeasonCard} from "../components/SeasonCard";
import {Link} from 'react-router-dom';

export default class ShowDetailPage extends Component{
    constructor(props) {
        super(props);
        this.service = new ShowService();
        this.state = {
            showId: this.props.match.params.showId,
            show:null,
            similarShows: [],
            loading: true
        }
    }

    componentDidMount() {
        this.loadData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.showId !== prevState.showId){
            this.loadData();
        }
    }

    static getDerivedStateFromProps(nextProps,prevState){
        if(nextProps.match.params.showId !== prevState.showId){
            console.log(nextProps.match.params.showId)
            return {
                showId: nextProps.match.params.showId,
                loading:true,
            }
        }
        else {
            return null;
        }
    }

    loadData(){
        this.service.getShow(this.state.showId)
            .then(result => {
                console.log(result)
                this.setState({
                    show: result
                })
            })
        this.service.getSimilarShows(this.state.showId)
            .then(result => {
                console.log(result)
                this.setState({
                    similarShows:result,
                    loading:false
                })
            })
    }
    render() {
        if(this.state.loading){
            return <h1>Loading</h1>
        }
        let moreSeasonUrl = '#';
        let crewCount = 4;
        let castCount = 10;
        let imageCount = 10;
        let crewArray = limitArray(this.state.show.credits.crew,crewCount)
        let castArray = limitArray(this.state.show.credits.cast,castCount)
        let imageArray = limitArray(this.state.show.images.backdrops,imageCount)

        return (
            <div>
                <div className="show-info border-b border-gray-800">
                    <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row">
                        <div className="flex-none">
                            <img src={this.state.show.poster_path} alt="poster" className="w-64 lg:w-96" />
                        </div>
                        <div className="md:ml-24">
                            <h2 className="text-4xl mt-4 md:mt-0 font-semibold">{this.state.show.original_name}</h2>
                            <div className="flex flex-wrap items-center text-gray-400 text-sm">
                                <svg className="fill-current text-orange-500 w-4" viewBox="0 0 24 24">
                                    <g data-name="Layer 2">
                                        <path
                                            d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
                                            data-name="star"/>
                                    </g>
                                </svg>
                                <span className="ml-1">{this.state.show.vote_average}</span>
                                <span className="mx-2">|</span>
                                <span>{this.state.show.first_air_date}</span>
                                <span className="mx-2">|</span>
                                { this.state.show.genres.map((item,key)=>{
                                        if(this.state.show.genres[key+1]){
                                            return <span className="mx-1" key={key}>{item.name}, </span>
                                        }
                                        return <span className="mx-1" key={key}>{item.name} </span>
                                    })
                                }
                            </div>

                            <p className="text-gray-300 mt-8">
                                {this.state.show.overview}
                            </p>

                            <Crew crew={this.state.show.credits.crew} />
                            <PlayTrailer />

                        </div>
                    </div>
                </div>
                <Cast cast={this.state.show.credits.cast} />
                <Seasons seasons={this.state.show.seasons} moreSeasonUrl="#" />
                <Images images={this.state.show.images.backdrops} />
                <SimilarShows shows={this.state.similarShows} />
            </div>
        );
    }
}

const SimilarShows = function(props){
    if(props.shows.length > 0){
        return <div className="movie-images">
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-4xl font-semibold">Similar Shows</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" id="galleryGrid">
                    {props.shows.map((item,key) => {
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

const Images = function (props) {
    let imageCount = 10;
    let imageArray = limitArray(props.images,imageCount)
    return <div className="movie-images border-b border-gray-800">
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
}

const Seasons = function(props){
    let seasonArray = limitArray(props.seasons,5);
    return  <div className="show-cast border-b border-gray-800">
                <div className="container mx-auto px-4 py-16">
                    <div className="flex justify-between">
                        <h2 className="text-4xl font-semibold">Seasons</h2>
                        <div className="text-4xl font-semibold">
                            <Link className="hover:text-orange-500 hover:underline" to={props.moreSeasonUrl}>
                                More+
                            </Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {seasonArray.map((item,key) => {
                            return <SeasonCard season={item} key={key} />
                        })}
                    </div>
                </div>
            </div>
}

const Cast = function(props){
    let castCount = 10;
    let castArray = limitArray(props.cast,castCount)
    return <div className="movie-cast border-b border-gray-800">
                <div className="container mx-auto px-4 py-16">
                    <h2 className="text-4xl font-semibold text-orange-500">Cast</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {castArray.map((item,key) => {
                            return <MovieCastCard actor={item} key={key} />
                        })}
                    </div>
                </div>
            </div>
}

const Crew = function(props){
    let crewCount = 4;
    let crewArray = limitArray(props.crew,crewCount)
    return <div className="mt-12">
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
}

const PlayTrailer = function (props) {
    return <div className="mt-12">
                <a href="#"
                   className="flex inline-flex items-center bg-orange-500 text-gray-900 rounded font-semibold px-5 py-4 hover:bg-orange-600 transition ease-in-out duration-150">
                    <svg className="w-6 fill-current" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
                    <span className="ml-2">Play Trailer</span>
                </a>
            </div>
}


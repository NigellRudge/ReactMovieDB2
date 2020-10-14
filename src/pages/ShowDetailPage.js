import React, {Component} from "react";
import ShowService from "../services/ShowService";
import {CastComponent} from "../components/CastComponent";
import {ImagesComponent} from "../components/ImagesComponent";
import {SimilarItemsComponent} from "../components/SimilarItemsComponent";
import {TrailerComponent} from "../components/TrailerComponent";
import {CrewComponent} from "../components/CewComponent";
import {SeasonsComponent} from "../components/SeasonsComponent";

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
        const style = {
            backgroundImage: `url('${this.state.show.backdrop_path}')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'auto',
        }
        console.log(style);
        return (
            <div>
                <div className="show-info border-b border-gray-800">
                        <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row" >
                            <div className="flex-none">
                                <img src={this.state.show.poster_path} alt="poster"  className="w-64 lg:w-96" />
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

                                <CrewComponent crew={this.state.show.credits.crew} />
                                <TrailerComponent />

                            </div>
                        </div>
                </div>
                <CastComponent cast={this.state.show.credits.cast} />
                <SeasonsComponent seasons={this.state.show.seasons} moreSeasonUrl="#" />
                <ImagesComponent images={this.state.show.images.backdrops} />
                <SimilarItemsComponent items={this.state.similarShows} type={2} />
            </div>
        );
    }
}














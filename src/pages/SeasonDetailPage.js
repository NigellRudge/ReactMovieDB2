import React, {Component} from "react";
import ShowService from "../services/ShowService";
import {TrailerComponent} from "../components/TrailerComponent";
import {EpisodeComponent} from "../components/EpisodeComponent";


export default class SeasonDetailPage extends Component{
    constructor(props) {
        super(props);
        this.service = new ShowService();
        this.state = {
            season: null,
            loading:true,
            seasonId:this.props.match.params.seasonId,
            showId:this.props.match.params.showId
        }
    }

    componentDidMount() {
        this.service.getSeasonInfo(this.state.showId,this.state.seasonId)
            .then(result => {
                console.log(result)
                this.setState({
                    season:result,
                    loading: false
                })
            })
    }

    render(){
        if(this.state.loading){
            return <div></div>;
        }
        else {
            return (<div>
                    <div className=" border-b border-gray-800">
                        <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row">
                            <div className="flex-none ">
                                <img src={this.state.season.poster_path} alt="season_poster" className="w-64 lg:w-96" />
                            </div>
                            <div className="md:ml-24">
                                <h2 className="text-4xl mt-4 md:mt-0 font-semibold">{this.state.season.name}</h2>
                                <div className="flex flex-wrap items-center text-gray-400 text-sm">
                                    <svg className="fill-current text-orange-500 w-4" viewBox="0 0 24 24"><g data-name="Layer 2"><path d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z" data-name="star" /></g></svg>
                                    <span className="ml-1">80</span>
                                    <span className="mx-2">|</span>
                                    <span>{this.state.season.air_date}</span>
                                    <span className="mx-2">|</span>
                                </div>
                                <p className="text-gray-300 mt-8">
                                    {this.state.season.overview}
                                </p>
                                <TrailerComponent />
                            </div>
                        </div>
                    </div>

                    <EpisodeComponent episodes={this.state.season.episodes} showId={this.state.showId} seasonId={this.state.seasonId} />
                </div>
            );
        }
    }
}

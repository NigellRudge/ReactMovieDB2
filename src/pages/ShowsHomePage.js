import React from 'react';
import ShowService from '../services/ShowService';
import {MediaContainer} from "../components/MediaContainer";
import {MEDIA_TYPES} from "../utils/config";
import SkeletonCardList from "../components/SkeletonCardList";

export default class ShowsHomePage extends React.Component {
    constructor(props){
        super(props);
        this.service = new ShowService();
        this.state = {
            nowAiringShows: null,
            topRatedShows: null,
            loading: true
        }
    }

    async componentDidMount(){
        this.loadData();
    }

    async loadData(){
        await setTimeout(()=>{
            this.service.getNowAiringShows()
                .then(result => {
                    this.setState({
                        nowAiringShows: result
                    })
                    console.log(this.state.nowAiringShows)
                })
                .then(()=>{
                    this.service.getTopRatedShows()
                        .then(result => {
                            this.setState({
                                topRatedShows: result,
                                loading: false
                            });
                            console.log(this.state.topRatedShows)
                        })
                        .then(()=>{
                            this.setState({
                                loading: false
                            });
                        });
                });
        },1200)
    }
    render(){
        if(this.state.loading){
            return(
                <div>
                    <SkeletonCardList title="Popular Shows" />
                    <SkeletonCardList title="Now Airing" />
                </div>
            )
        }
        else {
            return(
                    <div className="container mx-auto px-4 pt-10">
                        <div className="popular-movies">
                            <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">
                                Popular Shows
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                {this.state.nowAiringShows.map((show,key) =>{
                                        return <MediaContainer item={show} type={MEDIA_TYPES.SHOW} key={key} />
                                    }
                                 )}
                            </div>
                        </div>


                        <div className="popular-movies py-24">
                            <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">
                                Now Airing
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                {this.state.topRatedShows.map((show,key) =>{
                                    return <MediaContainer item={show} type={MEDIA_TYPES.SHOW} key={key} />
                                    }
                                 )}
                            </div>
                        </div>
                    </div>
            );
        }
    }
}

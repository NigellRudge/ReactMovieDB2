import React , {Component} from 'react';
import ActorService from "../services/ActorService";
import {MediaContainer} from "../components/MediaContainer";
import {MEDIA_TYPES} from "../utils/config";

export default class ActorHomePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            popularActors: null,
            loading: true
        }
    }

    async componentDidMount() {
        let service = new ActorService();
        await service.getPopularActors()
            .then(result => {
                this.setState({
                    popularActors: result,
                    loading:false
                })
                console.log(this.state.popularActors)
            })
    }

    render() {
        if(this.state.loading){
            return <h1>Loading</h1>
        }
        else {
            return (
                <div className="container mx-auto px-4 pt-16">
                    <div className="popular-actors">
                        <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">Popular actors</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                            {this.state.popularActors.map((actor,key)=>{
                                return <MediaContainer type={MEDIA_TYPES.ACTOR} item={actor} key={key}/>
                            })
                            }
                        </div>
                    </div>
                </div>
            );
        }
    }
}

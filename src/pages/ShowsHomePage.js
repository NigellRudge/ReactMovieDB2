import React from 'react';
import ShowCard from '../components/ShowCard';
import ShowService from '../services/ShowService';

export default class ShowsHomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            nowAiringShows: null,
            topRatedShows: null,
            loading: true
        }
    }

    componentDidMount(){
        let service = new ShowService();
        service.getNowAiringShows()
                .then(response => {
                    this.setState({
                        nowAiringShows: response.data.results

                    })
                    console.log(this.state.nowAiringShows)
        });
        service.getTopRatedShows()
                .then(response => {
                    this.setState({
                        topRatedShows: response.data.results,
                        loading: false
                    });
                    console.log(this.state.topRatedShows)
        });
    }

    render(){
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                {this.state.nowAiringShows.map((show,key) =>{
                                        return <ShowCard show={show} key={key}></ShowCard>
                                    }
                                 )}
                            </div>
                        </div>


                        <div className="popular-movies py-24">
                            <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">
                                Now Playing
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                {this.state.topRatedShows.map((show,key) =>{
                                        return <ShowCard show={show} key={key}></ShowCard>
                                    }
                                 )}
                            </div>
                        </div>
                    </div>
            );
        }
    }
}

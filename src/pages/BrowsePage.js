import React, {Component} from "react";
import MenuComponent from "../components/MenuComponent";
import {MediaContainer} from "../components/MediaContainer";
import {api_key, MEDIA_TYPES} from "../utils/config";
import SkeletonCardList from "../components/SkeletonCardList";
import Browse from "../data/Browse";
import PaginationComponent from "../components/PaginationComponent";

export default  class BrowsePage extends Component {
    constructor(props) {
        super(props);
        this.browseService =new Browse();
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.createGenreDropdowns = this.createGenreDropdowns.bind(this);
        this.state = {
            loading:true,
            type: 'movie',
            mediaType: MEDIA_TYPES.MOVIE,
            page: 1,
            results: [],
            query: null,
            tvGenres:[],
            movieGenres: [],
            selectedGenres: [],
            totalResultPages:10,
            totalResults: 0
        }
    }

     componentDidMount(){
        this.loadData();
    }

    async loadData(){
        this.browseService.setType(this.state.type)
        await this.browseService.getGenres()
            .then(result => {
                this.setState({
                    movieGenres:result
                })
            });
        this.setState({
            type:"tv",
            mediaType:MEDIA_TYPES.SHOW
        });
        this.browseService.setType(this.state.type);
        await this.browseService.getGenres()
            .then(result => {
                this.setState({
                    tvGenres:result
                })
            })
        this.setState({
            type:"movie",
            mediaType:MEDIA_TYPES.MOVIE
        });
        this.browseService.setType(this.state.type)
        await this.browseService.browseContent([27])
            .then(response =>{
                console.log(response.results)
                this.setState({
                    results:response.results,
                    totalResults:response.total_results,
                    totalResultPages:response.total_pages,
                    loading:false
                })
            })
    }

    handleTypeChange(e){
        let value = e.target.value;
        console.log(e.target.value);
        if(value !== this.state.type){
            this.setState({
                type:value.toLowerCase()
            })
        }
    }



    createGenreDropdowns(){
        const {type} = this.state;
        let items = [];
        if(type.toLowerCase() === "movie"){
            this.state.movieGenres.map((item,key)=>{
                let data = <option value={item.id} key={key}>{item.name}</option>;
                items.push(data)
                return true;
            })
        }
        else if(type.toLowerCase() === "tv"){
            this.state.tvGenres.map((item,key)=>{
                let data = <option value={item.id} key={key}>{item.name}</option>;
                items.push(data)
                return true;
            })
        }
        return items;
    }

    render() {

        const {loading} = this.state;
        return (
            <div>
                <MenuComponent />
                <div className="container mx-auto flex justify-center ">
                    <div className="w-2/3">
                       <div className="text-center">
                           <span className="text-orange-400  font-bold text-4xl"> Browse Movie/Shows</span>
                       </div>

                        <div className="mt-4 flex">
                            <input type="text" name="query" id="query" className="pl-5 w-3/4 h-12" placeholder="Movie/Show title" />
                            <span className="bg-green-700 px-5 h-12 py-2 block rounded ml-2 w-1/4 text-center hover:bg-green-500 text-xl border-green-600 hover:border-green-100">Search</span>
                        </div>
                        <div className="flex mt-4">
                            <div className="mr-3">
                                <label htmlFor="type" className="block ml-3 text-xl text-white">Type</label>
                                <select className="bg-gray-700 text-white px-3 py-2 mt-1" onChange={this.handleTypeChange} id="type" name="type">
                                    <option value="movie">Movies</option>
                                    <option value="tv">TV</option>
                                </select>
                            </div>
                            <div className="mr-3">
                                <label htmlFor="genres" className="block ml-3 text-xl text-white">Genres</label>
                                <select className="bg-gray-700 text-white px-3 py-2 mt-1" id="genres" name="genres">
                                    {this.createGenreDropdowns()}
                                </select>
                            </div>
                            <div className="mr-3">
                                <label htmlFor="rating" className="block ml-3 text-xl text-white">Rating</label>
                                <select className="bg-gray-700 text-white px-3 py-2 mt-1" id="rating" name="rating">
                                    <option value={90}>90+</option>
                                    <option value={80}>80+</option>
                                    <option value={70}>70+</option>
                                    <option value={60}>60+</option>
                                    <option value={50}>50+</option>
                                    <option value={40}>40+</option>
                                    <option value={30}>30+</option>
                                    <option value={20}>20+</option>
                                    <option value={10}>10+</option>
                                </select>
                            </div>
                            <div className="">
                                <label htmlFor="year" className="block ml-3 text-xl text-white">Year</label>
                                <select className="bg-gray-700 text-white px-3 py-2 mt-1" id="year" name="year">
                                    <option value={2020}>2020</option>
                                    <option value={2019}>2019</option>
                                    <option value={2018}>2018</option>
                                    <option value={2017}>2017</option>
                                    <option value={2010}>2005-2010</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" border-t border-gray-800 pt-8 border-gray-400 flex justify-center mt-8">
                        <PaginationComponent offset={5} totalPages={this.state.totalResultPages} totalResults={this.state.totalResults} currentIndex={this.state.page} />
                </div>
                <div className="">
                    {loading && <SkeletonCardList />}
                    {!loading &&

                    <div className="container mx-auto px-4 pt-10">
                        <div className="popular-movies">
                            <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">
                                {this.state.type} Results
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                {this.state.results.map((movie,key) =>{
                                        return <MediaContainer type={this.state.mediaType} item={movie} key={key} />
                                    }
                                )}
                            </div>
                        </div>
                    </div>}
                </div>
            </div>

        );
    }


}

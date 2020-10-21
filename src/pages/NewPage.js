import React, {Component} from 'react';
import {api_key, base_url, MEDIA_TYPES} from "../utils/config";
import axios from 'axios';
import PaginationComponent from "../components/PaginationComponent";
import SkeletonCardList from "../components/SkeletonCardList";
import {MediaContainer} from "../components/MediaContainer";
import {appendMediaUrl, filterArray, populateGenreArray} from "../utils/functions";


export default  class NewPages extends Component{
    constructor(props) {
        super(props);
        this.handleMediaTypeChange = this.handleMediaTypeChange.bind(this)
        this.createGenreDropDowns = this.createGenreDropDowns.bind(this)
        this.handleGenreChange = this.handleGenreChange.bind(this)
        this.handleRatingChange = this.handleRatingChange.bind(this)
        this.handleYearChange = this.handleYearChange.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
        this.state = {
            loading:true,
            movieGenres: [],
            showGenres: [],
            selectableGenres: [],
            currentPage: 1,
            totalResults: 1000,
            totalPages:100,
            mediaType:MEDIA_TYPES.MOVIE,
            type:"movie",
            results:[],
            query:'',
            selectedGenre:null
        }
    }

    async componentDidMount() {
        await this.loadGenres()
        await this.loadData()
    }

    async loadData(){
        let url=`${base_url}discover/${this.state.type}`;
        let params= {
            api_key:api_key,
            page:this.state.currentPage,
            append_to_response:'images,credits',
            with_genres:this.state.selectedGenre
        };
        await axios.get(url,{params:params})
            .then(response =>{
                let items = appendMediaUrl(response.data.results,'poster_path');
                    if(this.state.type.toLowerCase() === 'movie'){
                        items = items.map((item)=>{
                            item.genre_ids = populateGenreArray(item.genre_ids,this.state.movieGenres)
                            return item;
                        })
                        items = filterArray(items,this.state.query,'name')
                        console.log('movies')
                        console.table(items)
                    }
                    else {
                        items = items.map((item)=>{
                            item.genre_ids = populateGenreArray(item.genre_ids,this.state.showGenres)
                            return item;
                        })
                        items = filterArray(items,this.state.query,'original_title')
                        console.log('Shows')
                        console.table(items)
                    }

                this.setState({
                    results:items,
                    loading:false
                })
            })
    }

    async submitSearch(){

    }

    async loadGenres(){
        let url = `${base_url}genre/movie/list`
        let params = {
            api_key:api_key,

        }
        await axios.get(url,{params:params})
            .then(response =>{
                this.setState({
                    movieGenres:response.data.genres,
                    selectableGenres:response.data.genres
                })
            });
        url = `${base_url}genre/tv/list`
        await axios(url,{params:params})
            .then(response => {
                this.setState({
                    showGenres:response.data.genres
                })
            })
    }

    handleYearChange($event){
        console.log($event.target.value)
    }

    handleRatingChange($event){
        console.log($event.target.value)
    }

    handleGenreChange($event){
        console.log($event.target.value)
        this.resetData();

    }

    handleMediaTypeChange(e){
        let type = e.target.value;
        if(type === 'movie'){
            this.setState({
                selectableGenres:this.state.movieGenres
            })
        }
        else if(type === 'tv'){
            this.setState({
                selectableGenres:this.state.showGenres
            })
        }
    }
    createGenreDropDowns(){
        let items = []
        for(let i=0;i<this.state.selectableGenres.length;i++){
            let item = <option key={i}  id={this.state.selectableGenres[i].id}>{this.state.selectableGenres[i].name}</option>
            items.push(item)
        }
        return items;
    }

    handlePageChange($event){
        console.log($event.target.value);
    }
    resetData(){
        this.setState({
            page:1,
            selectedGenre:[],
            query:'',

        })
    }
    render() {
        const {loading} = this.state;
        return(
            <div>
                <div className="mt-5 container mx-auto flex justify-center ">
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
                                <select className="bg-gray-700 text-white px-3 py-2 mt-1 rounded " onChange={this.handleMediaTypeChange} id="type" name="type">
                                    <option value="movie" className="rounded">Movies</option>
                                    <option value="tv" className="rounded">TV</option>
                                </select>
                            </div>
                            <div className="mr-3">
                                <label htmlFor="genres" className="block ml-3 text-xl text-white ">Genres</label>
                                <select className="bg-gray-700 text-white px-3 py-2 mt-1 pr-6 rounded" onChange={this.handleGenreChange} id="genres" name="genres">
                                    {this.createGenreDropDowns()}
                                </select>
                            </div>
                            <div className="mr-3">
                                <label htmlFor="rating" className="block ml-3 text-xl text-white">Rating</label>
                                <select className="bg-gray-700 text-white px-3 py-2 mt-1 rounded" onChange={this.handleRatingChange} id="rating" name="rating">
                                    {ratings.map((item,key) => {
                                        return <option value={item.id} key={key}>{item.value}</option>
                                    })};
                                </select>
                            </div>
                            <div className="">
                                <label htmlFor="year" className="block ml-3 text-xl text-white">Year</label>
                                <select className="bg-gray-700 text-white px-3 py-2 mt-1 rounded" onChange={this.handleYearChange} id="year" name="year">
                                    {years.map((item,key)=>{
                                        return <option value={item.id} key={key}>{item.value}</option>
                                    })};
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                    <PaginationComponent currentIndex={this.state.currentPage} totalResults={this.state.totalResults}
                                         offset={5} callback={this.handlePageChange} totalPages={this.state.totalResultPages} />
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
                    </div>
                }
            </div>
        );
    }
}

const ratings = [
    {id:90,value:"90+"},
    {id:80,value:"80+"},
    {id:70,value:"70+"},
    {id:60,value:"60+"},
    {id:50,value:"50+"},
    {id:40,value:"40+"},
    {id:30,value:"30+"},
    {id:20,value:"20+"},
    {id:10,value:"10+"},
]
const years = [
    {id:'2020',value:"2020"},
    {id:'2019',value:"2019"},
    {id:'2018',value:"2018"},
    {id:'2017',value:"2017"},
    {id:'2016',value:"2016"},
    {id:'2010-15',value:"2010-2015"},
    {id:'2005-2010',value:"2005-2010"},
    {id:'2000-2005',value:"2000-2005"},
    {id:'1990-2000',value:"1990-2000"},
    {id:'1980-1990',value:"1980-1990"},
]


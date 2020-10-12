import {api_key, base_url} from '../utils/config';
import axios from 'axios';
import {
    appendMediaUrlToProperty,
    ARRAYTYPE,
    populateGenreArray,
    SINGLETYPE
} from "../utils/functions";

export default class ShowService {
    constructor() {
        this.genres = []
        this.getShowGenres()
            .then(result => {
                this.genres = result
            })
    }
     async getNowAiringShows(page=1){
        let url = `${base_url}tv/on_the_air`;
         let params = {
             api_key:api_key,
             page:page,
             append_to_response: 'genres'
         }
        return await axios.get(url,{params:params})
                .then(response => {
                    response.data.results = appendMediaUrlToProperty(response.data.results,'poster_path',ARRAYTYPE);
                    response.data.results.map((item,key) => {
                        item.genre_ids = populateGenreArray(item.genre_ids,this.genres)
                        return true;
                    })
                    return response.data.results;
                })
                .catch(error => {
                    console.log(error)   ;
                })
     }

     async getTopRatedShows(page=1){
        let url = `${base_url}tv/top_rated?api_key=${api_key}`;
         let params = {
             api_key:api_key,
             page:page,
             append_to_response: 'genres'
         }
         return await axios.get(url,{params:params})
             .then(response => {
                 response.data.results = appendMediaUrlToProperty(response.data.results,'poster_path',ARRAYTYPE);
                 response.data.results.map((item,key) => {
                     item.genre_ids = populateGenreArray(item.genre_ids,this.genres)
                     return true;
                 })
                 return response.data.results;
             })
             .catch(error => {
                 console.log(error)   ;
             })
     }
    async getShowGenres(){
        let url = `${base_url}genre/tv/list`;
        let params = {
            api_key:api_key
        }
        return await axios.get(url,{params:params})
            .then(response => {
                return response.data.genres
            })
            .catch(error => {
                console.log(error);
            })
    }
     getShow(showId){
        let url = `${base_url}tv/${showId}?api_key=${api_key}`;
        let params = {
            api_key:api_key,
            append_to_response:'images,credits,genres'
        }
        return axios.get(url,{params:params})
            .then(response => {
                response.data.backdrop_path =  appendMediaUrlToProperty(response.data,'backdrop_path',SINGLETYPE)
                response.data.poster_path = appendMediaUrlToProperty(response.data,'poster_path',SINGLETYPE)
                response.data.images.backdrops = appendMediaUrlToProperty(response.data.images.backdrops,'file_path')
                response.data.images.posters = appendMediaUrlToProperty(response.data.images.posters,'file_path')
                response.data.credits.cast = appendMediaUrlToProperty(response.data.credits.cast,'profile_path')
                response.data.seasons = appendMediaUrlToProperty(response.data.seasons,'poster_path',ARRAYTYPE);
                return response.data;
            })
            .catch(error => {
                console.log(error)
            })
     }
    async getSimilarShows(showId,page=1){
        let  url = `${base_url}tv/${showId}/similar`;
        let params = {
            api_key:api_key,
            page:page,
            append_to_response: 'genres'
        }
        return await axios.get(url,{params:params})
            .then(response => {
                response.data.results = appendMediaUrlToProperty(response.data.results,'poster_path');
                response.data.results.map((item,key) => {
                    item.genre_ids = populateGenreArray(item.genre_ids,this.genres)
                    return true;
                })
                let length = 4;
                response.data.results = response.data.results.length > length ? response.data.results.slice(0,length) : response.data.results
                return response.data.results;
            })
            .catch(error => {
                console.log(error)
            })
    }
     searchShows(query,page=1){

     }
}

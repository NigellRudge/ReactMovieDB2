import {api_key, base_url, media_url} from '../utils/config';
import axios from 'axios';
import {appendUrlToPoster, populateGenreArray} from "../utils/functions";

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
                    response.data.results = appendUrlToPoster(response.data.results,media_url);
                    response.data.results.map((item,key) => {
                        item.genre_ids = populateGenreArray(item.genre_ids,this.genres)
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
                 response.data.results = appendUrlToPoster(response.data.results,media_url);
                 response.data.results.map((item,key) => {
                     item.genre_ids = populateGenreArray(item.genre_ids,this.genres)
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
        return axios.get(url)
     }

     searchShows(query,page=1){

     }
}

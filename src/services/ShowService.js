import {api_key, base_url, media_url} from '../utils/config';
import axios from 'axios';
import {appendUrlToPoster} from "../utils/functions";

export default class ShowService {

     async getNowAiringShows(page=1){
        let url = `${base_url}tv/on_the_air`;
        let params = {
            api_key:api_key,
            page:page
        }
        return await axios.get(url,{params:params})
                .then(response => {
                    response.data.results = appendUrlToPoster(response.data.results,media_url);
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
             page:page
         }
         return await axios.get(url,{params:params})
             .then(response => {
                 response.data.results = appendUrlToPoster(response.data.results,media_url);
                 return response.data.results;
             })
             .catch(error => {
                 console.log(error)   ;
             })
     }

     getShow(showId){
        let url = `${base_url}tv/${showId}?api_key=${api_key}`;
        return axios.get(url)
     }

     searchShows(query,page=1){

     }
}

import {api_key, base_url}  from '../utils/config';
import axios from 'axios';

export default class ShowService {

     getNowAiringShows(){
        let url = `${base_url}tv/on_the_air?api_key=${api_key}`;
        return axios.get(url)
     }

     getTopRatedShows(){
        let url = `${base_url}tv/top_rated?api_key=${api_key}`;
        return axios.get(url)
     }

     getShow(showId){
        let url = `${base_url}tv/${showId}?api_key=${api_key}`;
        return axios.get(url)
     }
}

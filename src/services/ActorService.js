import {api_key, base_url, media_url} from '../utils/config';
import axios from 'axios';
import {appendUrlToPoster, appendUrlToProfile} from "../utils/functions";

export default class ActorService {

    async getPopularActors(page = 1){
        let url =`${base_url}person/popular`;
        console.log(url)
        let params = {
            api_key:api_key,
            page:page
        }
        return await axios.get(url,{params:params})
            .then(response => {
                response.data.results = appendUrlToProfile(response.data.results,media_url);
                //console.log(response.data.results);
                return response.data.results;
            })
            .catch(error => {
                console.log(error)
            })
    }

    async getActorInfo(actorId){
        let url = `${base_url}person/${actorId}`;
        let params = {
            api_key:api_key,
            append_to_response:'images,credits'
        }
        return await axios.get(url,{params:params })
            .then(response => {
                response.data.backdrop_path = `${media_url}${response.data.backdrop_path}`;
                response.data.poster_path = `${media_url}${response.data.poster_path};`
                return response.data
            })
            .catch(error => {
                console.log(error)
            })

    }

    async searchActors(query,page = 1){
        let url = `${base_url}/search/person`;
        let params = {
            api_key:api_key,
            query:query
        }
        return await axios.get(url,{params:params})
            .then(response => {
                response.data.results = appendUrlToProfile(response.data.results,media_url);
                //console.log(response.data.results);
                return response.data.results;
            })
            .catch(error => {
                console.log(error);
            })
    }
}




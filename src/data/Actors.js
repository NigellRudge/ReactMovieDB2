import {api_key, base_url} from '../utils/config';
import axios from 'axios';
import {appendMediaUrl, ARRAYTYPE, limitArray, SINGLETYPE} from "../utils/functions";

let params = {
    api_key:api_key,
    page:1,
    append_to_response: null
}

export const getPopularActors = async(page=1) => {
    let url =`${base_url}person/popular`;
    params.page = page
    return await axios.get(url,{params:params})
        .then(response => {
            response.data.results = appendMediaUrl(response.data.results,'profile_path',ARRAYTYPE);
            return response.data.results;
        })
        .catch(error => {
            console.log(error)
        })
}

export const getActorInfo = async(actorId) => {
    let url = `${base_url}person/${actorId}`;
    params.append_to_response ='images,credits'
    return await axios.get(url,{params:params })
        .then(response => {
            response.data.profile_path = appendMediaUrl(response.data,'profile_path',SINGLETYPE)
            response.data.images.profiles = appendMediaUrl(response.data.images.profiles ,'file_path',ARRAYTYPE)
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
}

export const searchActors = async(query,page=1)=>{
    let url = `${base_url}/search/person`;
    params.query = query
    return await axios.get(url,{params:params})
        .then(response => {
            response.data.results = appendMediaUrl(response.data.results,'profile_path', ARRAYTYPE);
            return response.data.results;
        })
        .catch(error => {
            console.log(error);
        })
}

export const getActorRoles = async(actorId)=>{
    let url = `${base_url}person/${actorId}/movie_credits`;
    return await axios.get(url,{params:params})
        .then(response =>{
            console.log(url)
            response.data.cast = appendMediaUrl(limitArray(response.data.cast),'poster_path',ARRAYTYPE)
            console.log(response.data.cast)
            return response.data.cast
        })
        .catch(error=>{
            console.log(error)
        })
}





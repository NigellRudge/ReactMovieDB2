import {api_key, base_url, IMAGESIZES} from '../utils/config';
import axios from 'axios';
import {
    appendMediaUrl,
    ARRAYTYPE, getShortCode, limitArray,
    populateGenreArray,
    SINGLETYPE
} from "../utils/functions";

let params = {
    api_key:api_key,
    page: 1,
    append_to_response: ''
};

 export const getNowAiringShows = async(page=1)=>{
    let url = `${base_url}tv/on_the_air`;
    params.page = page;
    params.append_to_response = 'genres';
    return await axios.get(url,{params:params})
            .then(response => {
                response.data.results = appendMediaUrl(response.data.results,'poster_path',ARRAYTYPE);
                return response.data.results;
            })
            .catch(error => {
                console.log(error)   ;
            })
 }

 export const getTopRatedShows = async(page=1)=>{
    let url = `${base_url}tv/top_rated?api_key=${api_key}`;
     params.page = page;
     params.append_to_response = 'genres';
     return await axios.get(url,{params:params})
         .then(response => {
             response.data.results = appendMediaUrl(response.data.results,'poster_path',ARRAYTYPE);
             return response.data.results;
         })
         .catch(error => {
             console.log(error)   ;
         })
 }

export const getShowGenres = async()=>{
    let url = `${base_url}genre/tv/list`;
    return await axios.get(url,{params:params})
        .then(response => {
            return response.data.genres
        })
        .catch(error => {
            console.log(error);
        })
}
 export const getShow = async(showId)=>{
    let url = `${base_url}tv/${showId}`;
    params.append_to_response = 'images,credits,genres';
    return await axios.get(url,{params:params})
        .then(response => {
            response.data.backdrop_path =  appendMediaUrl(response.data,'backdrop_path',SINGLETYPE,IMAGESIZES.ORIGINAL.key)
            response.data.poster_path = appendMediaUrl(response.data,'poster_path',SINGLETYPE)
            response.data.images.backdrops = appendMediaUrl(response.data.images.backdrops,'file_path')
            response.data.images.posters = appendMediaUrl(response.data.images.posters,'file_path')
            response.data.credits.cast = appendMediaUrl(response.data.credits.cast,'profile_path')
            response.data.seasons = appendMediaUrl(response.data.seasons,'poster_path');
            return response.data;
        })
        .catch(error => {
            console.log(error)
        })
 }
export const getSimilarShows = async(showId,page=1)=>{
    let  url = `${base_url}tv/${showId}/similar`;
    params.page = page;
    params.append_to_response = 'genres';
    return await axios.get(url,{params:params})
        .then(response => {
            response.data.results = appendMediaUrl(response.data.results,'poster_path');
            response.data.results = limitArray(response.data.results,4);
            return response.data.results;
        })
        .catch(error => {
            console.log(error)
        })
}
 export const searchShows = async(query,page=1)=>{
     let url = `${base_url}/search/tv`;
     params.query = query;
     return await axios.get(url,{params:params})
         .then(response => {
             response.data.results = appendMediaUrl(response.data.results,'poster_path',ARRAYTYPE);
             return response.data.results;
         })
         .catch(error => {
             console.log(error);
         })
 }

export const getSeasonInfo = async(showId,seasonId)=>{
    let url = `${base_url}tv/${showId}/season/${seasonId}`;
    params.append_to_response = 'images,credits'
    return axios.get(url,{params:params})
        .then(response => {
            response.data.poster_path = appendMediaUrl(response.data,'poster_path',SINGLETYPE)
            response.data.images.posters = appendMediaUrl(response.data.images.posters,'file_path')
            response.data.episodes = appendMediaUrl(response.data.episodes,'still_path',ARRAYTYPE);
            response.data.episodes = getShortCode(response.data.episodes,'episode_number','E',ARRAYTYPE,'id');
            return response.data;
        })
        .catch(error => {
            console.log(error)
        })
}

export const getEpisodeInfo = async(showId, seasonId,episodeId)=>{
    let url = `${base_url}tv/${showId}/season/${seasonId}/episode/${episodeId}`;
    params.append_to_response = 'images';
    return await axios.get(url,{params})
        .then(response => {
            response.data.images.stills = appendMediaUrl(response.data.images.stills,'file_path',ARRAYTYPE,IMAGESIZES.NORMAL)
            response.data.still_path = appendMediaUrl(response.data,'still_path',SINGLETYPE,IMAGESIZES.NORMAL)
            response.data.guest_stars = appendMediaUrl(response.data.guest_stars,'profile_path',ARRAYTYPE,IMAGESIZES.NORMAL)
            return response.data;
        })
        .catch(error=>{
            console.log(error)
        })
}


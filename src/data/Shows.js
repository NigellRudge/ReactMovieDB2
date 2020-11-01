import {api_key, base_url, IMAGESIZES} from '../utils/config';
import axios from 'axios';
import {
    appendMediaUrl,
    ARRAYTYPE, getShortCode,
    populateGenreArray,
    SINGLETYPE
} from "../utils/functions";


 export const getNowAiringShows = async(page=1)=>{
    let url = `${base_url}tv/on_the_air`;
     let params = {
         api_key:api_key,
         page:page,
         append_to_response: 'genres'
     }
    return await axios.get(url,{params:params})
            .then(response => {
                response.data.results = appendMediaUrl(response.data.results,'poster_path',ARRAYTYPE);
                getShowGenres()
                    .then(genres =>{
                        response.data.results.map((item,key) => {
                            item.genre_ids = populateGenreArray(item.genre_ids,genres)
                            return true;
                        })
                    })
                return response.data.results;
            })
            .catch(error => {
                console.log(error)   ;
            })
 }

 export const getTopRatedShows = async(page=1)=>{
    let url = `${base_url}tv/top_rated?api_key=${api_key}`;
     let params = {
         api_key:api_key,
         page:page,
         append_to_response: 'genres'
     }
     return await axios.get(url,{params:params})
         .then(response => {
             response.data.results = appendMediaUrl(response.data.results,'poster_path',ARRAYTYPE);
             getShowGenres()
                 .then(genres =>{
                     response.data.results.map((item,key) => {
                         item.genre_ids = populateGenreArray(item.genre_ids,genres)
                         return true;
                     })
                 })
             return response.data.results;
         })
         .catch(error => {
             console.log(error)   ;
         })
 }

export const getShowGenres = async()=>{
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
 export const getShow = async(showId)=>{
    let url = `${base_url}tv/${showId}`;
    let params = {
        api_key:api_key,
        append_to_response:'images,credits,genres'
    }
    return await axios.get(url,{params:params})
        .then(response => {
            response.data.backdrop_path =  appendMediaUrl(response.data,'backdrop_path',SINGLETYPE,IMAGESIZES.ORIGINAL.key)
            response.data.poster_path = appendMediaUrl(response.data,'poster_path',SINGLETYPE)
            response.data.images.backdrops = appendMediaUrl(response.data.images.backdrops,'file_path')
            response.data.images.posters = appendMediaUrl(response.data.images.posters,'file_path')
            response.data.credits.cast = appendMediaUrl(response.data.credits.cast,'profile_path')
            response.data.seasons = appendMediaUrl(response.data.seasons,'poster_path',ARRAYTYPE);
            return response.data;
        })
        .catch(error => {
            console.log(error)
        })
 }
export const getSimilarShows = async(showId,page=1)=>{
    let  url = `${base_url}tv/${showId}/similar`;
    let params = {
        api_key:api_key,
        page:page,
        append_to_response: 'genres'
    }
    return await axios.get(url,{params:params})
        .then(response => {
            response.data.results = appendMediaUrl(response.data.results,'poster_path');
            getShowGenres()
                .then(genres =>{
                    response.data.results.map((item,key) => {
                        item.genre_ids = populateGenreArray(item.genre_ids,genres)
                        return true;
                    })
                })
            let length = 4;
            response.data.results = response.data.results.length > length ? response.data.results.slice(0,length) : response.data.results
            return response.data.results;
        })
        .catch(error => {
            console.log(error)
        })
}
 export const searchShows = async(query,page=1)=>{
     let url = `${base_url}/search/tv`;
     let params = {
         api_key:api_key,
         query:query
     }
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
    let params = {
        api_key:api_key,
        append_to_response:'images,credits'
    }
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
    let params = {
        api_key:api_key,
        append_to_response: 'images'
    };
    return await axios.get(url,{params})
        .then(response => {
            response.data.images.stills = appendMediaUrl(response.data.images.stills,'file_path',ARRAYTYPE,IMAGESIZES.NORMAL)
            response.data.still_path = appendMediaUrl(response.data,'still_path',SINGLETYPE,IMAGESIZES.NORMAL)
            response.data.guest_stars = appendMediaUrl(response.data.guest_stars,'profile_path',ARRAYTYPE,IMAGESIZES.NORMAL)
            console.log();
            return response.data;
        })
}


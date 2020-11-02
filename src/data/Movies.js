import {api_key, base_url, IMAGESIZES} from '../utils/config';
import axios from 'axios';
import {appendMediaUrl, ARRAYTYPE, limitArray, SINGLETYPE} from "../utils/functions";

let params = {
    api_key:api_key,
}
export const getPopularMovies = async (page = 1)=>{
    let url =`${base_url}movie/popular`;
    params.page = page;
    params.append_to_response = 'genres'
    return await axios.get(url,{params:params})
        .then(response => {
            response.data.results = appendMediaUrl(response.data.results,'poster_path');
            return response.data.results;
        })
        .catch(error => {
            console.log(error)
        })
}

export const getNowPlayingMovies = async(page = 1)=>{
    let url = `${base_url}movie/now_playing`;
    params.page = page;
    params.append_to_response = 'genres'
    return await axios.get(url,{params:params})
        .then(response => {
            response.data.results = appendMediaUrl(response.data.results,'poster_path');
            return response.data.results;
        })
        .catch(error => {
            console.log(error)
        })
}

 export const getMovieInfo = async(movieId)=>{
    let url = `${base_url}movie/${movieId}`;
    params.append_to_response ='images,credits'
    return await axios.get(url,{params:params })
            .then(response => {
                    response.data.backdrop_path =  appendMediaUrl(response.data,'backdrop_path',SINGLETYPE, IMAGESIZES.ORIGINAL.key)
                    response.data.poster_path = appendMediaUrl(response.data,'poster_path',SINGLETYPE)
                    response.data.images.backdrops = appendMediaUrl(response.data.images.backdrops,'file_path')
                    response.data.images.posters = appendMediaUrl(response.data.images.posters,'file_path')
                    response.data.credits.cast = appendMediaUrl(response.data.credits.cast,'profile_path')
                return response.data

            })
            .catch(error => {
                console.log(error)
            })

}

 export const SearchMovies = async(query,page = 1)=>{
    let url = `${base_url}/search/movie`;
    params.query = query
    return await axios.get(url,{params:params})
        .then(response => {
            response.data.results = appendMediaUrl(response.data.results,'poster_path',ARRAYTYPE);
            return response.data.results;
        })
        .catch(error => {
            console.log(error);
        })
 }

 export const getMovieGenres = async()=>{
     let url = `${base_url}genre/movie/list`;
     return await axios.get(url,{params:params})
         .then(response => {
             return response.data.genres
         })
         .catch(error => {
             console.log(error);
         })
 }

 export const getSimilarMovies = async (movieId,page=1)=>{
     let  url = `${base_url}movie/${movieId}/similar`;
     params.page = page;
     params.append_to_response = 'genres'
     return await axios.get(url,{params:params})
         .then(response => {
             response.data.results = appendMediaUrl(response.data.results,'poster_path');
             response.data.results = limitArray(response.data.results,4)
             return response.data.results;
         })
         .catch(error => {
             console.log(error)
         })
 }


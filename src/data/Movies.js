import {api_key, base_url} from '../utils/config';
import axios from 'axios';
import {appendMediaUrl,ARRAYTYPE,populateGenreArray,SINGLETYPE} from "../utils/functions";

export const getPopularMovies = async (page = 1)=>{
    let url =`${base_url}movie/popular`;
    let params = {
        api_key:api_key,
        page:page,
        append_to_response: 'genres'
    }
    return await axios.get(url,{params:params})
        .then(response => {
            response.data.results = appendMediaUrl(response.data.results,'poster_path');
            getMovieGenres()
                .then(genres=>{
                    response.data.results.map((item,key) => {
                        item.genre_ids = populateGenreArray(item.genre_ids,genres)
                    })
                    return true;
                })
            return response.data.results;
        })
        .catch(error => {
            console.log(error)
        })
}

export const getNowPlayingMovies = async(page = 1)=>{
    let url = `${base_url}movie/now_playing`;
    let params = {
        api_key:api_key,
        page:page,
        append_to_response: 'genres'
    }
    return await axios.get(url,{params:params})
        .then(response => {
            response.data.results = appendMediaUrl(response.data.results,'poster_path');
            getMovieGenres()
                .then(genres=>{
                    response.data.results = response.data.results.map((item) => {
                        item.genre_ids = populateGenreArray(item.genre_ids,genres)
                        return item;
                    })
                    return true;
                })
            return response.data.results;
        })
        .catch(error => {
            console.log(error)
        })
}

 export const getMovieInfo = async(movieId)=>{
    let url = `${base_url}movie/${movieId}`;
    let params = {
        api_key:api_key,
        append_to_response:'images,credits'
    }
    return await axios.get(url,{params:params })
            .then(response => {
                    response.data.backdrop_path =  appendMediaUrl(response.data,'backdrop_path',SINGLETYPE)
                    response.data.poster_path = appendMediaUrl(response.data,'poster_path',SINGLETYPE)
                    response.data.images.backdrops = appendMediaUrl(response.data.images.backdrops,'file_path')
                    response.data.images.posters = appendMediaUrl(response.data.images.posters,'file_path')
                    response.data.credits.cast = appendMediaUrl(response.data.credits.cast,'profile_path')
                //console.log(response.data);
                return response.data

            })
            .catch(error => {
                console.log(error)
            })

}

 export const SearchMovies = async(query,page = 1)=>{
    let url = `${base_url}/search/movie`;
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

 const getMovieGenres = async()=>{
     let url = `${base_url}genre/movie/list`;
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

 export const getSimilarMovies = async (movieId,page=1)=>{
     let  url = `${base_url}movie/${movieId}/similar`;
     let params = {
         api_key:api_key,
         page:page,
         append_to_response: 'genres'
     }
     return await axios.get(url,{params:params})
         .then(response => {
             response.data.results = appendMediaUrl(response.data.results,'poster_path');
             getMovieGenres()
                 .then(genres=>{
                     response.data.results = response.data.results.map((item) => {
                         item.genre_ids = populateGenreArray(item.genre_ids,genres)
                         return item;
                     })
                 })
             let length = 4;
             response.data.results = response.data.results.length > length ? response.data.results.slice(0,length) : response.data.results
             console.log(response.data.results)
             return response.data.results;
         })
         .catch(error => {
             console.log(error)
         })
 }


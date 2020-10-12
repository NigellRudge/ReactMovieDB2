import {api_key, base_url, media_url} from '../utils/config';
import axios from 'axios';
import {appendMediaurlToImages, appendUrlToPoster, populateGenreArray} from "../utils/functions";

class MovieService {
    constructor() {
        this.genres = []
        this.getMovieGenres().then(result => {
            this.genres = result
        })
    }
     async getPopularMovies(page = 1){
        let url =`${base_url}movie/popular`;
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
                console.log(error)
            })
    }

    async getNowPlayingMovies(page = 1){
        let url = `${base_url}movie/now_playing`;
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
                console.log(error)
            })
    }

     async getMovieInfo(movieId){
        let url = `${base_url}movie/${movieId}`;
        let params = {
            api_key:api_key,
            append_to_response:'images,credits'
        }
        return await axios.get(url,{params:params })
                .then(response => {
                        response.data.backdrop_path = `${media_url}${response.data.backdrop_path}`;
                        response.data.poster_path = `${media_url}${response.data.poster_path}`;
                        response.data.images.backdrops = appendMediaurlToImages(response.data.images.backdrops,'file_path')
                        response.data.images.posters = appendMediaurlToImages(response.data.images.posters,'file_path')
                        response.data.credits.cast = appendMediaurlToImages(response.data.credits.cast,'profile_path')
                    console.log(response.data);
                    return response.data

                })
                .catch(error => {
                    console.log(error)
                })

    }

     async SearchMovies(query,page = 1){
        let url = `${base_url}/search/movie`;
        let params = {
            api_key:api_key,
            query:query
        }
        return await axios.get(url,{params:params})
            .then(response => {
                response.data.results = appendUrlToPoster(response.data.results,media_url);
                console.log(response.data.results);
                return response.data.results;
            })
            .catch(error => {
                console.log(error);
            })
     }

     async getMovieGenres(){
         let url = `${base_url}genre/movie/list`;
         let params = {
             api_key:api_key
         }
         return await axios.get(url,{params:params})
             .then(response => {
                 //console.log(response);
                 return response.data.genres

             })
             .catch(error => {
                 console.log(error);
             })
     }
}

class ApiService {
    constructor(dataType) {
        this.dataType = dataType;
    }

    async fetchData(urlSegment, page = 1){
        let url = `${base_url}/${urlSegment}`;
        let params = {
            api_key:api_key,
            page:page
        }
        return await axios.get(url,{params:params})
            .then(response => {

            })
    }

}

export default MovieService;

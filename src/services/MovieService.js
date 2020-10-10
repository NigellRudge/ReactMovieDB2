import {api_key, base_url}  from '../utils/config';
import axios from 'axios';

class MovieService {

     getPopularMovies(){
        let url = base_url+'movie/popular?api_key='+api_key;
        return axios.get(url);
    }

    getNowPlayingMovies(){
        let url = base_url+'movie/now_playing?api_key='+api_key;
        return axios.get(url);
    }
     GetMovie(movieId){

    }

     SearchMovies(query){

    }
}

export default MovieService;

const api_key = 'a28d205a378cece6baa18ba20119765b';
const base_url = 'https://api.themoviedb.org/3/';
const media_url = 'https://image.tmdb.org/t/p/';

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July','Aug','Sept', 'Oct', 'Nov','Dec'
];
const IMAGESIZES = {
    ORIGINAL:{
        key:1,
        value: 'original'
    },
    SMALL:{
        key:2,
        value: 'w200'
    },
    NORMAL:{
        key:3,
        value: 'w500'
    }
}

const MEDIA_TYPES = {
    MOVIE:1,
    SHOW:2,
    ACTOR:3,
    IMAGE:4
}
const getMediaUrl = function(type=IMAGESIZES.ORIGINAL.key){
    let output = media_url;
    switch (type) {
        case IMAGESIZES.ORIGINAL.key:
            output += IMAGESIZES.ORIGINAL.value
            break;
        case IMAGESIZES.SMALL.key:
            output += IMAGESIZES.SMALL.value;
            break
        case IMAGESIZES.NORMAL.key:
            output += IMAGESIZES.NORMAL.value;
            break;
        default:
            output += 'w500';
            break;
    }
    return output
}
export  {api_key,base_url,media_url,getMediaUrl,IMAGESIZES,MEDIA_TYPES, months}

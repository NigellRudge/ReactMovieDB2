const api_key = 'a28d205a378cece6baa18ba20119765b';
const base_url = 'https://api.themoviedb.org/3/';
const media_url = 'https://image.tmdb.org/t/p/';

const ORIGINAL = 1;
const SMALL = 2;
const NORMAL = 3;
const getMediaUrl = function(type=NORMAL){
    let output = media_url;
    switch (type) {
        case ORIGINAL:
            output += 'original'
            break;
        case SMALL:
            output += 'w200';
            break
        case NORMAL:
            output += 'w500';
            break;
        default:
            output += 'w500';
            break;
    }
    return output
}
export  {api_key,base_url,media_url,ORIGINAL,NORMAL,SMALL,getMediaUrl}

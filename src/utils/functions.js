import {media_url} from "./config";


const appendUrlToPoster = function(inputArray, url){
    return inputArray.map((item) => {
        item.poster_path = `${url}${item.poster_path}`;
        return item;
    });
}

const appendUrlToProfile = function(inputArray, url){
    return inputArray.map((item) => {
        item.profile_path = `${url}${item.profile_path}`;
        return item;
    });
}
const getGenreString=  function(inputGenreIds=[],genres){
    let outputString = '';
    // eslint-disable-next-line array-callback-return
    inputGenreIds.map((genre_id,genre_id_key) =>{
        // eslint-disable-next-line array-callback-return
        genres.map((Genre,Genre_key) => {
            if(Genre.id === genre_id){
                if(!genre_id[genre_id_key+1]){
                    outputString += Genre.name;
                }
                else {
                    outputString += (Genre.name + ", ");
                }
            }
        })
    })
    return outputString;
}
const populateGenreArray= function(idArray=[],itemArray=[]){
    let outputArrray = [];
    for(var i=0;i<idArray.length;i++){
        for(var j=0;j<itemArray.length;j++){
            if(itemArray[j].id === idArray[i]){
                outputArrray.push(itemArray[j]);
            }
        }
    }
    return outputArrray;
}

const appendMediaurlToImages = function(inputArray,property){
    let outputArray = [];
    for(var i =0; i< inputArray.length; i++){
        inputArray[i][property] = `${media_url}${inputArray[i][property]}`;
        outputArray.push(inputArray[i]);
    }
    return outputArray;
}
export {appendUrlToPoster,appendUrlToProfile,getGenreString,populateGenreArray,appendMediaurlToImages };

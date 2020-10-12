import {media_url} from "./config";
import person_placeholder from '../assets/img/person_placeholder.png';
const ARRAYTYPE = 1;
const SINGLETYPE = 2;


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



const appendMediaUrlToProperty = function(input, property,type = 1){
    let output = null;
    if(type === ARRAYTYPE){
        output = [];
        for(let i =0; i< input.length; i++){
            if(input[i][property] !== null){
                input[i][property] = `${media_url}${input[i][property]}`;
            }
            else {
                input[i][property] = person_placeholder;
            }
            output.push(input[i]);
        }
    }else if(type === SINGLETYPE) {
            if(input[property] == null){
                output = person_placeholder;
                return output;
            }
        output = `${media_url}${input[property]}`;
    }
    return output;
}

const limitArray = function(inputArray,limit=5){
    return inputArray.length > limit ? inputArray.slice(0,limit): inputArray
}


export {populateGenreArray,appendMediaUrlToProperty,ARRAYTYPE,SINGLETYPE, limitArray };

import {getMediaUrl, IMAGESIZES} from "./config";
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

const getShortCode = function (input,property,char,type=ARRAYTYPE,replace=null) {
    let output = null;
    if(type === ARRAYTYPE){
        output = []
        for(let i=0;i<input.length;i++){
            if(input[i][property] !== null){
                if(replace !== null){
                    input[i][replace] = input[i][property] >= 10 ? `${char}${input[i][property]}`:`${char}0${input[i][property]}`;

                }
                else {
                    input[i][property] = input[i][property] >= 10 ? `${char}${input[i][property]}`:`${char}0${input[i][property]}`;
                    console.log(`${i}:${input[i][property] }`);
                }

            }
            else {
                if(replace !== null){
                    input[i][replace] = 'No info';
                    continue;
                }
                else {
                    input[i][property] = 'No info';
                }
            }
            output.push(input[i]);
        }
    }
    else if( type === SINGLETYPE) {
        if(replace !== null){
            input[replace] = input[property] >= 10 ? `${char}${input[property]}`:`${char}0${input[property]}`;
        }
        else {
            input[property] = input[property] >= 10 ? `${char}${input[property]}`:`${char}0${input[property]}`;
        }
    }
    return output;
}


const appendMediaUrl = function(input, property, type = ARRAYTYPE, size=IMAGESIZES.NORMAL.key){
    let output = null;
    if(type === ARRAYTYPE){
        output = [];
        for(let i =0; i< input.length; i++){
            if(input[i][property] !== null){
                input[i][property] = `${getMediaUrl(size)}${input[i][property]}`;
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
        output = `${getMediaUrl(size)}${input[property]}`;
    }
    return output;
}

const limitArray = function(inputArray,limit=5){
    return inputArray.length > limit ? inputArray.slice(0,limit): inputArray
}

const filterArray = function(inputArray=[],query="",property){
    let output = inputArray
    if(query != null && query.length > 0){
        output = inputArray.filter((item)=>{
              return item[property].toLowerCase().contains(query.toLowerCase())
        })
    }
    return output;
}


export {populateGenreArray,appendMediaUrl,ARRAYTYPE,SINGLETYPE, limitArray, getShortCode, filterArray };

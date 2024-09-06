export const youtubeAPI = "AIzaSyAMbGvi9n3LfwBoODf0YBmb67C32unkTNY"



export const valueConverter = (value)=>{
    if(value >= 1000000){
        return Math.floor(value/1000000) + "M"
    }
    if(value>=1000){
        return Math.floor(value/1000) + "k"
    }
    else{
        return value
    }
}
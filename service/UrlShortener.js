'use strict';

let urlDb=require("../db/url.db");
let encode_decode_util=require("../utils/encoder_decoder");
const { respondWithCode } = require("../utils/writer");


/**
 * Fetch all the shortened urls. 
 * If shortened_url is given, then only the corresponding entry will be returned.
 *
 * url_id String  (optional)
 * returns List
 **/
exports.fetchAllUrls =async function(shortened_url) {
  let docs=await urlDb.findUrl(shortened_url);
  let resp=[]
  for(const url_objs of docs){
    let obj={};
    obj.shortened_url=`https://short-url.ly/${url_objs.url_id}`
    obj.original_url=url_objs.original_url
    resp.push(obj)
  }
  return resp;
}



exports.validateUrl=async function(url){
  if(!url){
    return false
  }else{
    if(!url.startsWith("http://")&&!url.startsWith("https://")){
      // throw(respondWithCode(422, {payload: {message: "Invalid URL"}}))
      return false;
    }
  }
  return true;
}

/**
 * Create shortened url and stores the url along with the hash id generated.
 * 
 *
 * body Urls_body  (optional)
 * returns List
 **/
exports.shortenUrl = async function(body) {
  try{
    let original_url=body.original_url;
    let isValidUrl=await exports.validateUrl(original_url);//Throws error if url is invalid.
    if(isValidUrl){
      let shortened_url=await urlDb.fetchShortenedUrlForOriginalUrl(original_url);
      // console.log(shortened_url);
      if(shortened_url){
        return(
          {message: `The shortened url for the given url already exist. Shortened url is https://short-url.ly/${shortened_url}`}
        )
      }
      else{
        let last_url_id=await urlDb.fetchLatestShortenedUrl();
        if(!last_url_id){
          let res=await urlDb.saveUrl(original_url, "0000000");
          let response_messge={
            message: "Successfully created the shortened url",
            original_url: res.original_url,
            shortened_url: `https://short-url.ly/${res.url_id}`,
            timestamp: res.createdAt
          }
          return response_messge;
        }else{
            let decoded_url=encode_decode_util.decode(last_url_id);
            let new_url=decoded_url+1;
            let new_encoded_url=encode_decode_util.encode(new_url);
      
            var res=await urlDb.saveUrl(original_url, new_encoded_url);
            res["shortened_url"]=`https://short-url.ly/${res.url_id}`
            delete res["url_id"]
            let response_messge={
              message: "Successfully created the shortened url",
              original_url: res.original_url,
              shortened_url: `https://short-url.ly/${res.url_id}`,
              timestamp: res.createdAt
            }
            return response_messge;
        }
    }
    }else{
      return (respondWithCode(422,  {message: "Invalid URL"}))
    }
  }catch(e){
    console.log("error: ", e);
    throw({message: "Unexpected Error"});
  }
  
  
}


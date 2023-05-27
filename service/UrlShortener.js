'use strict';

let urlDb=require("../db/url.db");
let encode_decode_util=require("../utils/encoder_decoder");


/**
 * Fetch all the shortened urls.
 * Fetch all the shortened urls. 
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


/**
 * Create shortened url.
 * Fetch all the shortened urls. 
 *
 * body Urls_body  (optional)
 * returns List
 **/
exports.shortenUrl = async function(body) {
  try{
    let original_url=body.original_url;
  let shortened_url=await urlDb.fetchShortenedUrlForOriginalUrl(original_url);
  // console.log(shortened_url);
  if(shortened_url){
    return(
      {message: `The shortened url for the given url already exist. Shortened url is https://short-url.ly/${shortened_url}`}
    )
  }
  else{
    console.log("Calling save url....");
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
        console.log("last_decoded_url", decoded_url);
        let new_url=decoded_url+1;
        console.log("new id", new_url)
        let new_encoded_url=encode_decode_util.encode(new_url);
        console.log("new_encoded_url", new_encoded_url);
  
        var res=await urlDb.saveUrl(original_url, new_encoded_url);
        res["shortened_url"]=`https://short-url.ly/${res.url_id}`
        delete res["url_id"]
        console.log("********", typeof res);
        let response_messge={
          message: "Successfully created the shortened url",
          original_url: res.original_url,
          shortened_url: `https://short-url.ly/${res.url_id}`,
          timestamp: res.createdAt
        }
        return response_messge;
    }
  }
  }catch(e){
    console.log(e);
    throw({message: "Unexpected Error"});
  }
  
  
}


let urlModel=require("../models/url.model");
exports.findUrl=async function(shortened_url){
    let docs;
    if(!shortened_url){
        docs=await urlModel.find().sort().exec();
    }else{
        docs=await urlModel.find({url_id: shortened_url.split("/")[shortened_url.split("/").length-1]})
    }
    
    return docs

}

exports.fetchShortenedUrlForOriginalUrl=async function(original_url){
    let docs=await urlModel.findOne({
        original_url: original_url

    })
    if(docs){
        return docs.url_id;
    }
    else{
        return docs;
    }
}

exports.fetchLatestShortenedUrl=async function(){
    try{
        let docs=await urlModel.find().sort({createdAt:1}).exec();
        if(docs&&docs.length)
            return docs[docs.length-1].url_id
        else
            return docs[0];
    }catch(e){
        console.log(e);
    }
}


exports.saveUrl= async function(url, url_id){
    let url1=new urlModel({
        url_id: url_id,
        original_url: url
    });
    let docs=await url1.save();
    console.log("Docs=", docs);
    return docs;
}
exports.encode=function(id){
    let characters="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let base=characters.length
    let res=""
    while(id>0){
        bas_enc_val=id%base
        res=characters[bas_enc_val]+res
        id=Math.floor(id/base)
    }
    let resp;
    if(res.length<7){
        resp=res.padStart(7, "0")
    }
    return resp
}

exports.decode=function(id){
    let characters="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let base=characters.length
    s=0
    for(let i=0;i<id.length;i++){
        s=s+Math.pow(base, id.length-i-1)*characters.indexOf(id[i]); 
    }
    return s;

}
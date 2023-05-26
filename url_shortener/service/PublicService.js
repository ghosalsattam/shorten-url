'use strict';


/**
 * Fetch all the shortened urls.
 * Fetch all the shortened urls. 
 *
 * url_id String  (optional)
 * returns List
 **/
exports.fetchAllUrls = function(url_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ { }, { } ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create shortened url.
 * Fetch all the shortened urls. 
 *
 * body Urls_body  (optional)
 * returns List
 **/
exports.shortenUrl = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ { }, { } ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


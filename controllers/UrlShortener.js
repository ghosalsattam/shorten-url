'use strict';

var utils = require('../utils/writer.js');
var UrlShortenerService = require('../service/UrlShortener.js');

module.exports.fetchAllUrls = function fetchAllUrls (req, res, url_id) {
  UrlShortenerService.fetchAllUrls(url_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.shortenUrl = async function shortenUrl (req, res, body) {
  await UrlShortenerService.shortenUrl(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

'use strict';

var utils = require('../utils/writer.js');
var Public = require('../service/PublicService');

module.exports.fetchAllUrls = function fetchAllUrls (req, res, next, url_id) {
  Public.fetchAllUrls(url_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.shortenUrl = function shortenUrl (req, res, next, body) {
  Public.shortenUrl(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

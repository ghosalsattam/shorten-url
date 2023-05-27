let express =require("express");
const Router = express.Router();
let controller= require( "../controllers/UrlShortener.js");
Router.get("", function (req, res) {
    controller.fetchAllUrls(req, res, req.query["url_id"]);
});
Router.post("", function (req, res) {
    controller.shortenUrl(req, res, req.body);
});
module.exports={Router};
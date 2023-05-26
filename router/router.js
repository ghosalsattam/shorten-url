let express =require("express");
const Router = express.Router();
let controller= require( "../controllers/UrlShortener.js");
Router.get("", function (req, res) {
    controller.fetchAllUrls(req, res);
});
module.exports={Router};
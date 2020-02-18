var express = require("express");
var router = express.Router();
let contentservice = require("../service/ContentService");

/* GET home page. */
router.get("/content/:page", function(req, res, next) {
    contentservice.getMovies(req.params.page)
    .then(data=>{
        res.json(data);
    });
});
router.get("/content/:page/:category", function(req, res, next) {
    contentservice.getMoviesByCategory(req.params.category,req.params.page)
    .then(data=>{
        res.json(data);
    });
});

router.get("/offering", function(req, res, next) {
    contentservice.getOfferings()
    .then(data=>{
        res.json(data);
    });
});

module.exports = router;

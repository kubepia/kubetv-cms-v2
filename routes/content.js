var express = require("express");
var router = express.Router();
let contentservice = require("../service/ContentService");


logger = (msg)=>{
    let date = new Date();
    console.log(`[sam-cranberry-cms] ${date.toGMTString()}-${msg}`);
}

/* GET home page. */
router.get("/content/:page", function(req, res, next) {
    contentservice.getMovies(req.params.page)
    .then(data=>{
        logger(`get ${data.length} data`)
        res.json(data);
    });
});
router.get("/best/:category", function(req, res, next) {
    contentservice.getBestByCategory(req.params.category)
    .then(data=>{
        logger(`get ${data.length} best recommand of ${req.params.category}`)
        res.json(data);
    });
});
router.get("/content/:page/:category/:include", function(req, res, next) {
    let include = req.params.include === 'f' ? false : true
    contentservice.getMoviesByCategory(req.params.category,include,req.params.page)
    .then(data=>{
        logger(`get ${data.length} data of ${req.params.category}`)
        res.json(data);
    });
});
router.get("/content/:page/:category", function(req, res, next) {
    contentservice.getMoviesByCategory(req.params.category,true,req.params.page)
    .then(data=>{
        logger(`get ${data.length} data of ${req.params.category}`)
        res.json(data);
    });
});

router.get("/offering", function(req, res, next) {
    contentservice.getOfferings()
    .then(data=>{
        logger(`get ${data.length} offering data`)
        res.json(data);
    });
});

module.exports = router;

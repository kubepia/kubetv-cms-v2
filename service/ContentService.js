let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/berries", { useNewUrlParser: true });
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("mongo connected !");
});
const pageSize = 50;
const carouselSize = 15;
var _movieSchema = new mongoose.Schema({
    _id: mongoose.ObjectId,
    id: Number,
    category: String,
    name: String,
    director: String,
    actors: String,
    summary: String,
    like: Number,
    image: String,
    membership: Boolean
});
class ContentService {
    constructor() {
        this.movies = mongoose.model("movies", _movieSchema);
    }

    getMovies = (no = 0) => {
        const _movies = this.movies;
        return new Promise((resolve, reject) => {
            _movies.find(
                {},
                null,
                {
                    skip: no * pageSize,
                    limit: pageSize,
                    sort: {
                        id: 1
                    }
                },
                (err, docs) => {
                    resolve(docs);
                }
            );
        });
    };
    getBestByCategory = (category) => {
        const _movies = this.movies;
        return new Promise((resolve, reject) => {
            _movies.find(
                {category:category},
                null,
                {
                    skip: 0,
                    limit: carouselSize,
                    sort: {
                        like: -1
                    }
                },
                (err, docs) => {
                    resolve(docs);
                }
            );
        });
    };
    getMoviesByCategory = (category,no = 0) => {
        const _movies = this.movies;
        return new Promise((resolve, reject) => {
            _movies.find(
                {category:category},
                null,
                {
                    skip: no * pageSize,
                    limit: pageSize,
                    sort: {
                        like: -1
                    }
                },
                (err, docs) => {
                    resolve(docs);
                }
            );
        });
    };
    getOfferings = () => {
        const _movies = this.movies;
        return new Promise((resolve, reject) => {
            _movies.find(
                {},
                null,
                {
                    // skip: no * pageSize,
                    limit: 20,
                    sort: {
                        like: -1
                    }
                },
                (err, docs) => {
                    // docs.forEach(e=>{
                    //     e.membership = false
                    // })
                    resolve(docs);
                }
            );
        });
    }
}

module.exports = new ContentService();

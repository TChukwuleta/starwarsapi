const axios = require("axios");
const res = require("express/lib/response");
const utils = require("../middlewares/utils")
const Comment = require('../models/Comment')

// Get all movies and return values in ways specified
const getMovies = async (req, res) => { 
    try {
        const result = await axios.get('https://swapi.py4e.com/api/films')

        const allMovies = result.data.results.sort((a, b) => {
            return  new Date(a.release_date) - new Date(b.release_date);
        });

        let movies = []

        for(const film of allMovies){
            const movieId = utils.getMovieId(film.url)
            const { count } = await Comment.findAndCountAll({
                where: {
                    movie_id: movieId 
                }, 
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            movies.push({
                Title: film.title,
                OpeningCrawl: film.opening_crawl,
                ReleaseDate: film.release_date,
                CommentCount: count
            })
        }

        console.log('Go check out the movies')
        return res.status(200).json(movies)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({ message: "No Movies found" })
    }
}

const getSingleMovie = async (id) => {
    const result = await axios.get(`https://swapi.py4e.com/api/films/${id}/`)
    if(result.data == null){
        return res.status(400).json({ message: "No movie exist with that Id"})
    }
    return result.data
} 

module.exports = {
    getMovies,
    getSingleMovie
}
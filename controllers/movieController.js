const axios = require("axios");
const res = require("express/lib/response");

// Get all movies and return values in ways specified
const getMovies = async (req, res) => { 
    try {
        const result = await axios.get('https://swapi.py4e.com/api/films')

        const allMovies = result.data.results.sort((a, b) => {
            return  new Date(a.release_date) - new Date(b.release_date);
        });

        let movies = []

        allMovies.forEach(output => {
            movies.push({
                Title: output.title,
                OpeningCrawl: output.opening_crawl,
                ReleaseDate: output.release_date,
                CharacterList: output.characters,
                CommentCount: []
            })
        });
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
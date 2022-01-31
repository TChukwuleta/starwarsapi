const axios = require("axios")

// Other movies functionality required by other services

// Get all movies
const getAllMovies = async () => {
    const result = await axios.get('https://swapi.py4e.com/api/films');
    return result.data.results;
}

// Get movie by ID
const getMovieById = async (movieId) => {
    const result = await axios.get(`https://swapi.py4e.com/api/films/${movieId}`);
    return result.data;
}

module.exports = {
    getAllMovies,
    getMovieById
}
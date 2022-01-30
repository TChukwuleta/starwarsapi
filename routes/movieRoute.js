const express = require("express")
const movieController = require('../controllers/movieController')
const router = express()

// Get all movies
router.get('/', movieController.getMovies)

module.exports = router
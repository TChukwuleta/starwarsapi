const express = require("express")
const characterController = require('../controllers/charactersController')
const router = express()

// Get all movies
router.get('/', characterController.getCharacters)

module.exports = router
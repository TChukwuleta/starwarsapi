const express = require("express")
const commentrController = require('../controllers/commentController')
const router = express()

// Get all comments
router.post('/add', commentrController.addComment)
router.get('/:movieId', commentrController.getCommentByMovie)

module.exports = router
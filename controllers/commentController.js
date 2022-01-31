const db  = require('../config/db')
const Joi = require("joi")
const movieUtils = require("../middlewares/movies")
const utils = require("../middlewares/utils")


const commentSchema = Joi.object({
    comment: Joi.string().max(500).required(),
    // movieId: Joi.number().integer().required()
    movieId: Joi.required()

})

const addComment = async (req, res) => {
    // Validate payload
    const { comment, movieId } = req.body
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;

    const { error } = commentSchema.validate(req.body)
    if(error){
        return res.status(400).json({ message: "Validation failed. Please ensure you enter the necessary parameters in the right order"})
    }

    // Get movie
    const allMovies = await movieUtils.getAllMovies()
    // console.log(allMovies)
    const findMovie = utils.checkMovieExist(allMovies, movieId)
    if(!findMovie){
        return res.status(400).json({ message: `No movie with id: ${movieId} exist` })
    }
    console.log(findMovie)
    // Add comment to the DB
    db.query(`INSERT INTO "commentdata" (comment, public_ip, movie_id) VALUES ($1, $2, $3)`, [comment, ip, parseInt(movieId) ], (error, result) => {
        if(error){
            console.log(error.message)
            return res.status(400).json({ message: "An error occured while adding comment" })
        }
        res.status(201).json({ message: `Comment: "${comment}" has been added successfully` })
    })
}

const getCommentByMovie = async (req, res) => {
    const movieId = req.params.movieId
    db.query(`SELECT * FROM "commentdata" WHERE movie_id = $1`, [movieId], (error, result) => {
        if(error){
            console.log(error.message)
            return res.status(400).json({ message: "An error occured while adding comment" })
        }
        // const comments = result.sort((a, b) => {
        //     return (a.comment) - (b.comment);
        // });
        res.status(200).json({ message: result.rows })
    })
}

module.exports = {
    addComment,
    getCommentByMovie
}
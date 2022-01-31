// const db  = require('../config/db')
const Comment = require("../models/Comment")
const Joi = require("joi")
const movieUtils = require("../middlewares/movies")
const utils = require("../middlewares/utils")


const commentSchema = Joi.object({
    comment: Joi.string().max(500).required(),
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
    const findMovie = utils.checkMovieExist(allMovies, movieId)
    if(!findMovie){
        return res.status(400).json({ message: `No movie with id: ${movieId} exist` })
    }

    // Add comment to the DB
    await Comment.create({
        movie_id: movieId,
        comment,
        public_ip: ip  
    })
    return res.status(201).json({ message: `Comment: "${comment}" has been added successfully` })
}

const getCommentByMovie = async (req, res) => { 
    const movieId = req.params.movieId
    const { rows, count } = await Comment.findAndCountAll({
        where: {
            movie_id: movieId 
        },
        order: [
            ['createdAt', 'DESC']
        ]
    })
    // console.log(count)
    // console.log(rows)
    if(count <= 0){
        return res.status(400).json({ message: "Eh yaa.. Try again later, you hear?"})
    }
    let comments = []
    comments.push({
        NoOfComment: count,
        MovieId: movieId,
        Comments: rows
    })

    return res.status(200).json({ message: comments })    
}

module.exports = {
    addComment,
    getCommentByMovie
} 
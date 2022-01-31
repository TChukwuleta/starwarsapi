const express = require("express")
const app = express()
require("dotenv").config()

// Importing all necessary routes
const movieRoutes = require('./routes/movieRoute')
const characterRoutes = require('./routes/characterRoutes')
const commentRoutes = require('./routes/commentRoutes')

app.use(express.json())

// Calling the endpoints
app.use('/movies', movieRoutes)
app.use('/characters', characterRoutes)
app.use('/comments', commentRoutes)

const port = 2022 || process.env.port
app.listen(port, () => {
    console.log(`Hey star fans... This server is up and running on port ${port}`)
}) 
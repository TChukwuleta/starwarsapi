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
app.get('/', (req, res) => {
    res.json({ message: "Welcome Aboard" })
})

app.get('*', (req, res) => {
    res.status(404).json({ message: "Guess you are lost. Just head to the home page" })
})

const port = process.env.PORT || 2022
app.listen(port, () => {
    console.log(`Hey star fans... This server is up and running on port ${port}`)
})  
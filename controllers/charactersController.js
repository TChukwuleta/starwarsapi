const axios = require("axios")
const characterUtils = require('../middlewares/characters')
const utils = require('../middlewares/utils')

const getCharacters = async (req, res) => {
    const movieId = req.params.id 
    const { gender, sortby } = req.query

    // Get title of movie selected
    const movieResult = await utils.getMovie(movieId)
    const title = movieResult.title

    if(gender){
        if(gender !== 'male' && gender !== 'female' && gender !== 'n/a'){
            return res.status(400).json({ message: "Incorrect gender value selected. Gender value can only be male, female or n/a"})
        }
    }
    if(sortby){
        if(sortby !== "name" && sortby !== "gender" && sortby !== "height"){
            return res.status(400).json({ message: "Incorrect sort parameter. You can only sort by gender, height or name"})
        }
    } 


    // Get all characters belonging to a particular movie
    const characters = await utils.getMovieCharacters(movieId)
    // If gender is passed in the query, filter characters by gender
    const filteredCharacters = gender ? utils.filterCharactersByGender(characters, gender) : characters
    // If sort parameters is passed in the query, sort characters by the parameters
    const sortedCharacters = sortby ? utils.sortedByFxn(filteredCharacters, sortby) : filteredCharacters
    console.log(sortedCharacters)
    
    // Calculate the total height of characters
    const totalHeightInCm = filteredCharacters.reduce((total, character) => {
        total += isNaN(character.height) ? 0 : parseInt(character.height);
        return total;
    }, 0);

    // Getting the height in feets and inches
    const totalHeight = utils.newHeightFormat(totalHeightInCm)

    return res.status(200).json({
        data: {
            MovieTitle: title,
            FilteredBy: gender,
            SortedBy : sortby,
            Characters: sortedCharacters
        },
        metadata: {
            TotalCharacters: characters.length,
            TotalHeight: totalHeight,
            totalHeightInCm: totalHeightInCm + " cm"
        } 
    })
}

module.exports = {
    getCharacters
} 
const axios = require("axios")
const characterUtils = require('../middlewares/characters')
const utils = require('../middlewares/utils')

const getCharacters = async (req, res) => {
    const movieId = req.params.id
    const { gender, sortby } = req.query
    console.log(gender)

    // Get title of movie selected
    const movieResult = await characterUtils.getMovie(movieId)
    const title = movieResult.title

    // if(!gender && !sortby) {
    //     // return res.status(200).json(result.data.results)
    // }
    if(gender){
        if(gender !== 'male' && gender !== 'female' && gender !== 'n/a'){
            return res.status(400).json({ message: "Incorrect gender value selected. Gender value can only be male, female or n/a"})
        }
    }
    if(sortby){
        if(sortby !== "name" || sortby !== "gender" || sortby !== "height"){
            return res.status(400).json({ message: "Incorrect sort parameter. You can only sort by gender, height or name"})
        }
    } 


    // Get all characters belonging to a particular movie
    const characters = await characterUtils.getMovieCharacters(movieId)
    const filteredCharacters = gender ? utils.filterCharactersByGender(characters, gender) : characters
    
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
            Characters: filteredCharacters
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
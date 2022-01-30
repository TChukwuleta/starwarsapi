const axios = require("axios")

// Change the height displayed from just height in cm, to also include feets and inches
const newHeightFormat = (height) => {
    const feet = Math.floor(height * 0.0328084)
    const inches = ((height *  0.393700787) % 12).toFixed(2)

    return `${height}cm i.e ${feet}ft and ${inches}inches`
}

// Filter character list by gender
const filterCharactersByGender = (characters, gender) => {
    return characters.filter((character) => {
        return character.gender === gender.toLowerCase()
    })
}

// Sorted By
const sortedByFxn = () => {}


module.exports = {
    newHeightFormat,
    filterCharactersByGender
}
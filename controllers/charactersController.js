const axios = require("axios")

const getCharacters = async (req, res) => {
    const result = await axios.get('https://swapi.py4e.com/api/people')
    const { gender, sortby } = req.query

    if(!gender && !sortby) {
        return res.status(200).json(result.data.results)
    }

    if(gender){
        if(gender !== 'male' || gender !== 'female' || gender !== 'n/a'){
            return res.status(400).json({ message: "Incorrect gender value selected. Gender value can only be male, female or n/a"})
        }
    }

    if(sortby){
        if(sortby !== "name" || sortby !== "gender" || sortby !== "height"){
            return res.status(400).json({ message: "Incorrect sort parameter. You can only sort by gender, height or name"})
        }
    }

    // return res.status(200).send(result.data)
    // sort by one of name, gender or height in ascending or descending order

    console.log("Hello")
}

module.exports = {
    getCharacters
}
const axios = require("axios")
const Comment = require('../models/Comment')

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
const sortedByFxn = (characters, sortby) => {

    switch (sortby) {
    case 'name':
        sortByKey(characters, 'name')
        break;
    case 'gender':
        sortByKey(characters, 'gender')
    case 'height':
        // sortByKey(characters, 'name')
        characters.sort(function(a,b){
            return a.height - b.height;
        });
        break;
    default:
        console.log(`Sorry, You cannot sort by this value`);
    }
}

//  Function to sort by key
function sortByKey(array, key) {
    return array.sort(function(a, b) {
      var x = a[key];
      var y = b[key];
      console.log((x < y) ? -1 : ((x > y) ? 1 : 0))
      return ((x < y) ? -1 : ((x > y) ? 1 : 0)); 
    });
}  

// Extract a movieId from the movie url
const getMovieId = (url) => {
    const len = url.length
    const arr = url.split('/')
    return url[len - 1] === '/' ? arr[arr.length - 2] : arr[arr.length - 1]
}

const idFromURL = (url) => {
    const id = parseInt(url.match(/\d\/$/)[0].replace("/",""))

    if(isNaN(id)){
        throw new Error("Error getting Id from URL")
    }
    return id
}


// Get single movie
const getMovie = async (id) => {
    const result = await axios.get(`https://swapi.py4e.com/api/films/${id}/`)
    return result.data
} 

// Check and find if a particular movie exists
const checkMovieExist = (movies, movieId) => {
    const result = movies.find(movie => {
        const id = getMovieId(movie.url)
        if(id == movieId) {
            return true;
        } 
        return false; 
    });
    return result;
};


// Getting single movie characters
// Getting all the characters
async function fetchPeople() {
    let res = await axios.get('https://swapi.py4e.com/api/people/');
    return res.data.results;
}

// Getting all the characters for a particular movie
const showCharacters = async (movie) => {
    const people = await fetchPeople();
    const matchingPeople = [];
    const amovie = await movie
    amovie.characters.forEach((movieCharacter) => {
        people.forEach((person) => {
            const isMatching = person.url === movieCharacter;
            if (isMatching) {
                matchingPeople.push(person);
            }
        });

    });
    return matchingPeople;
}

const getMovieCharacters = async (id) => {
    const all = await showCharacters(getMovie(id))
    return all
}

module.exports = {
    newHeightFormat,
    filterCharactersByGender,
    sortedByFxn,
    getMovieId,
    checkMovieExist,
    idFromURL,
    getMovie,
    getMovieCharacters
}
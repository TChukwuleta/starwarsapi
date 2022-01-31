const axios = require("axios")

// Getting a single movie
const getSingleMovie = async (id) => {
    const result = await axios.get(`https://swapi.py4e.com/api/films/${id}/`)
    return result.data
} 

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
    console.log(amovie.title)
    console.log('char count: ', amovie.characters.length);
    console.log('peopel count: ', people.length);
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

exports.getMovieCharacters = async (id) => {
    const all = await showCharacters(getSingleMovie(id))
    return all
}
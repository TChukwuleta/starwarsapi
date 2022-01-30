const axios = require("axios")

const getSingleMovie = async (id) => {
    const result = await axios.get(`https://swapi.py4e.com/api/films/${id}/`)
    const data = result.data
    return data
} 

async function fetchPeople() {
    let res = await axios.get('https://swapi.py4e.com/api/people/');
    return res.data.results;
}


const showPeople = async (movie) => {
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

const getData = async (id) => {
    const all = await showPeople(getSingleMovie(id))
    return all
}


console.log(getData(2))
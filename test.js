
const getNum = (val) => {
    const len = val.length
    const arr = val.split('/')
    return val[len - 1] === '/' ? arr[arr.length - 2] : arr[arr.length - 1]
}

const getMovieId = (url) => {
    const len = url.length
    const arr = url.split('/')
    return url[len - 1] === '/' ? arr[arr.length - 2] : arr[arr.length - 1]
}

const pattern = /(?<-\/)(?<id>\d+)/

const idFromURL = (url) => {
    const id = parseInt(url.match(pattern)?.group?.id)

    if(isNaN(id)){
        throw new Error("Error getting Id from URL")
    }
    return id
}

let str = "https://swapi.py4e.com/api/people/101/"

// let Val = str.split(str.length-2)

console.log(idFromURL(str))
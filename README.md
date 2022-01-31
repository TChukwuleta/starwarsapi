# WORKING WITH STAR WARS DATA USING SWAPI API

Creating a small set of rest API endpoints using NodeJS that can be used for listing the names of Star Wars movies along with their opening crawls and comment counts, adding and listing anonymous comments for a movie, and getting the character list for a movie.

## LIVE LINK OF THE PROJECT
### [GET] https://metacare-swapitest.herokuapp.com/

## LOCAL LINK OF THE PROJECT
### [GET] http://localhost:2022

## PUBLISHED POSTMAN DOCUMENTATION
### https://documenter.getpostman.com/view/17832863/UVeDrmXr

## API Endpoints

##### Getting all movies in the required format
#### [GET] https://metacare-swapitest.herokuapp.com/movies

![Getting all the movies](https://drive.google.com/uc?export=view&id=1dk-GKXYtBWHfsHLdZtzEJ-6IjPR6lSEQ)


##### Getting list of all characters for a particular movie
#### [GET] https://metacare-swapitest.herokuapp.com/characters/2

2 => Represent the id of a particular movie you want to get the list of characters for.
Currently There are only 7 movies available. Hence you can only get the list of characters for these seven (7) characters. 

![List of all characters in a movie](https://drive.google.com/uc?export=view&id=1WGAiUpxRcT32vyl5DwESl_C0eg-258fa)

![Link of all the characters showing height in feets and inches](https://drive.google.com/uc?export=view&id=1IhCuOa2xJut9UC9bXm0KKaT2CQb1BiHl)

##### Getting list of all characters for a particular movie filtered by a particular gender
#### [GET] https://metacare-swapitest.herokuapp.com/characters/2?gender=male

male => Represent the gender of choice you want to filter by.
Currently there are 3 genders by which you can filter the characters list by: male, female, and n/a.

![filter by gender](https://drive.google.com/uc?export=view&id=1roWpmpxlDbJFdbiPR7uDAHc-4jrGyPnd)

#### For the following endpoints, they are not available on the live link, but you can test it on local as they are working fine on local. Working to fix this ASAP.

##### Adding a comment for a particular movie
#### [POST] https://metacare-swapitest.herokuapp.com/comments/add

This endpoint takes two payload properties: 
- Comment, which represents the comment in text that the user wants to include to a particular movie.
- MovieId, which represent the movie Id a user wants to comment on.

{
    "comment": "Test Comment",
    "movieId": 1
}

![Adding a new comment](https://drive.google.com/uc?export=view&id=1YcG7kSMlSrVE3b-1_ao6KmWEWEF-yk4M)

##### Getting all comments for a particular movie in reverse chronological order
#### [GET] https://metacare-swapitest.herokuapp.com/comments/1

1 => Represent the ID of the movie of which you want to get all the comments.

![Getting comments by movie Id](https://drive.google.com/uc?export=view&id=1B1Ng3PqDzK1qs46Hm8ZqjWFEThN17yAz)
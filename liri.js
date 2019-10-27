
//require for node modules and npm's
const keys = require('./keys.js');
const fs = require('fs');
const request = require('request');
const spotify = require('node-spotify-api');
const axios = require('axios');
const dotenv = require('dotenv').config();
const moment = require('moment');

//Spotify key
//var spotify = new Spotify (keys.spotify);


var userPrompt = function(userCommand){

    userCommand = process.argv[2];  
 
 switch(userCommand){
        case "concert-this":
            searchConcert();
            break;
        case "spotify-this-song":
            searchSpotify();
            break;
        case "movie-this":
            searchMovie();
            break;
        case "do-what-it-says":
            doSay();
            break;
    }
}
userPrompt();

var searchSpotify = function (songName){
    if (songName === undefined){
        songName = "The Sign";
    } else{
        //SPOTIFY API????
    }

    console.log(`Artist: ${artist} \nSong Name: ${song} \nAlbum: ${album} \n Preview song here: ${alink}`);

}

function searchMovie (movieName){
    movieName = process.argv[3];

    if (movieName === undefined){
        movieName = "Mr. Nobody";  
    } ; 

    var queryURL = "https://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";

    axios({
      url: queryURL,
      method: "GET"
    }).then(function(response) { 
        //console.log(process.argv[3])
        //console.log(response.data);
       console.log(`Title of the movie: ${response.data.Title} \nYear the movie came out: ${response.data.Year} \nIMDB Rating of the movie: ${response.data.Rated}\nRotten Tomatoes Rating: ${response.data.Ratings[1].Value}\nCountry where the movie was produced: ${response.data.Country} \nLanguage: ${response.data.Language} \nPlot: ${response.data.Plot} \nActors: ${response.data.Actors}`);

});

}


function searchConcert(artist){

    artist = process.argv[3];

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

    var date= response.data[0].datetime 
    var momentDate= moment(date).format('L')
   // console.log(momentDate)
   console.log(`Artist: ${response.data[0].venue.name} \nVenue Location: ${response.data[0].venue.city} \nDate: ${momentDate}`);

});
}

//var doSay = function(){}

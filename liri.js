require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var request = require("request")
var Spotify = require('node-spotify-api');

var spotify = new Spotify (keys.spotify);

//Spotify

var userPrompt = function(userCommand){
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
var searchSpotify = function (songName){
    if (songName === undefined){
        songName = "The Sign";
    } else{
        //SPOTIFY API????
    }

    console.log(`Artist: ${artist} \nSong Name: ${song} \nAlbum: ${album} \n Preview song here: ${alink}`);

    }

var searchMovie = function(movieName){
    if(movieName === undefined){
        movieName = "Mr. Nobody";
    } else {
        //OMDB API call
    }
    
console.log(`Title of the movie: ${title} \nYear the movie came out: ${year} \nIMDB Rating of the movie: ${rating}\nRotten Tomatoes Rating: ${rtrating}\nCountry where the movie was produced: ${country} \nLanguage: ${language} \nPlot: ${plot} \nActors: ${actors}`);

}

var searchConcert = function(concert){
    //call Boysintown API
    
console.log(`Venue name: ${venue} \nVenue Location: ${location} \n Date: ${date}`);

//use moment to format this as "MM/DD/YYYY")
//moment().format('L');

}

var doSay = function(){

}

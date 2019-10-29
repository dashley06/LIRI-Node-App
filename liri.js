require('dotenv').config();

//variables for node modules and npm's
const keys = require('./keys.js');
const fs = require('fs');
const request = require('request');
const Spotify = require('node-spotify-api');
const axios = require('axios');
const moment = require('moment');
const spotify = new Spotify (keys.spotify);


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
            doWhatISay();
            break;
    }
}
userPrompt();

function searchSpotify(songName){

    songName = process.argv.splice(3).join(" ");

    if (songName === undefined){
        songName = "The Sign"
    };

    spotify.search({
        type: "track",
        query: songName,
    
    }, function (err, data) {
        if (err) {
            console.log(err)
        } 
        console.log("\n------------------------\nSong Name: " + data.tracks.items[0].name);
        console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
        console.log("Album Name: " + data.tracks.items[0].album.name);
        console.log("Preview URL: " + data.tracks.items[0].preview_url + "\n------------------------\n");

        fs.appendFileSync("log.txt", `Song Name: ${data.tracks.items[0].name} \nArtist Name: ${data.tracks.items[0].artists[0].name} \nAlbum Name: ${data.tracks.items[0].album.name} \nPreview URL: ${data.tracks.items[0].preview_url} \n------------------------\n`)
        }

    )}


function searchMovie (movie){
  //  movieName = process.argv[3]
    movie = process.argv.splice(3).join(" ");

    if (movie === undefined){
        movie = "Mr. Nobody";  
    } ; 

    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    axios({
      url: queryURL,
      method: "GET"
    }).then(function(response) { 
        //console.log(response.data);
       console.log(`Title of the movie: ${response.data.Title} \nYear the movie came out: ${response.data.Year} \nIMDB Rating of the movie: ${response.data.Rated}\nRotten Tomatoes Rating: ${response.data.Ratings[1].Value}\nCountry where the movie was produced: ${response.data.Country} \nLanguage: ${response.data.Language} \nPlot: ${response.data.Plot} \nActors: ${response.data.Actors}`);
        
       fs.appendFileSync("log.txt",`Title of the movie: ${response.data.Title} \nYear the movie came out: ${response.data.Year} \nIMDB Rating of the movie: ${response.data.Rated}\nRotten Tomatoes Rating: ${response.data.Ratings[1].Value}\nCountry where the movie was produced: ${response.data.Country} \nLanguage: ${response.data.Language} \nPlot: ${response.data.Plot} \nActors: ${response.data.Actors} \n-----------`)
       
});
}


function searchConcert(artist){

    artist = process.argv.splice(3).join(" ");

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

    var date= response.data[0].datetime 
    var momentDate= moment(date).format('L')
   // console.log(momentDate)
   console.log(`Venue: ${response.data[0].venue.name} \nVenue Location: ${response.data[0].venue.city} \nDate: ${momentDate}`);
  
   fs.appendFileSync("log.txt",`Venue: ${response.data[0].venue.name} \nVenue Location: ${response.data[0].venue.city} \nDate: ${momentDate} \n-----------`);

});
}

function doWhatISay(){

    fs.readFile("random.txt", "utf8", function(err, response) {

        if (err) {
          return console.log(err);
        }
        //console.log(response);
        var responseArr = response.split(",");

       console.log(responseArr)

       userCommand= responseArr[0];
       songName= responseArr[1]   
      // newSongName = replace(songName, newSongName);

    searchSpotify(songName);
    })
    
}


require("dotenv").config();
// Import the node-spotify-api NPM package.
var Spotify = require("node-spotify-api");
// Import the API keys
var keys = require("./keys");
// Import the request npm package.
var request = require("request");
// Import the FS package for read/write.
var fs = require("fs");
// Initialize the spotify API client with keys
var spotify = new Spotify(keys.spotify);

var callSpotifyAPI = function(songName) {
    if (songName === undefined) {
      songName = "1999";
    }
    spotify.search(
      {
        type: "track",
        query: songName,
        limit: 15
      },
      function(err, data) {
        if (err) {
          console.log("Error occurred: " + err);
          return;
        }
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
          console.log(i);
          console.log("Artist name: " + songs[i].artists[0].name);
          console.log("Song title: " + songs[i].name);
          console.log("Track number: " + songs[i].track_number);
          console.log("Album: " + songs[i].album.name);
          console.log("Release date: " + songs[i].album.release_date);
          console.log("Album type: " + songs[i].album.album_type);
          console.log("Preview song: " + songs[i].preview_url);
          console.log("----------------------------------------------------");
        }
      }
    );
  };

  // Function for determining which command is executed
// _____________________________________
var userCommand = function(caseData, functionData) {
    switch (caseData) {
    // use spotify api
      case "spotify-this-song":
      callSpotifyAPI(functionData);
      break;
    }
  };

  // Function which takes in command line arguments and executes switch statement accordigly
// _____________________________________
var cmdLnArgs = function(argOne, argTwo) {
    userCommand(argOne, argTwo);
  };

  cmdLnArgs(process.argv[2], process.argv[3]);
  
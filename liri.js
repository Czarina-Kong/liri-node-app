console.log('liri.js--running')
require("dotenv").config()

// Let's make some variables

// export modules
var fs = require('fs')
var request = require('request')
var Twitter = require('twitter')
var SpotifyWebApi = require('spotify-web-api-node')
var keys = require("./keys.js")
// variables to store commands and user inputs
var command = process.argv[2]
var userInput = process.argv[3]
// array to store tweets
var tweets = []
// default searches when process.argv[3] is empty
var defaultSong = "The Sign"
var defaultMovie = "Mr. Nobody"
// variables to access keys
var client = new Twitter(keys.twitter)
var spotifyApi = new SpotifyWebApi(keys.spotify)

// Let's make some functions

//function to run commands
function runCommands(command, userInput){
	console.log('runCommands function is working')
	console.log(userInput)
	switch(command){
		case 'my-tweets':
			getTweets()
			break
		case 'spotify-this-song':
			//If user has not specified a song , use default
			if(userInput === undefined){
				userInput = defaultSong
			}     
			searchSong(userInput)
			break
		case 'movie-this':
			//If user has not specified a movie Name , use default
			if(userInput === undefined){
				userInput = defaultMovie
			}    
			searchMovie(userInput)
			break
		case 'do-what-it-says':
			doWhatItSays()
			break
		default: 
			console.log("Please type any of the following commands: my-tweets spotify-this-song movie-this do-what-it-says.")
	}
}
runCommands()
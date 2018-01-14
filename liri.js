// console.log('liri.js--running')
require("dotenv").config()

// Let's make some variables

// export modules
var fs = require('fs')
var request = require('request')
var twitter = require('twitter')
// var spotify = require('spotify')
var keys = require("./keys.js")
// variables to store commands and user inputs
var command = process.argv[2]
var userInput = process.argv[3]
// default searches when process.argv[3] is empty
var defaultSong = "The Sign"
var defaultMovie = "Mr. Nobody"
// variables to access keys
var client = new twitter(keys.twitter)
// var spotify = new spotify(keys.spotify)

// Let's make some functions

//function to run commands

	// console.log('runCommands function is working')
switch(command){
	case 'my-tweets':
		myTweets();
		break;
	case 'spotify-this-song':
		//If user has not specified a song , use default
		if(userInput === undefined){
			userInput = defaultSong;
		}
		console.log('userInput: '+userInput)     
		searchSong(userInput);
		break;
	case 'movie-this':
		//If user has not specified a movie Name , use default
		if(userInput === undefined){
			userInput = defaultMovie;
		}    
		searchMovie(userInput);
		break;
	case 'do-what-it-says':
		doWhatItSays();
		break;
	default: 
		console.log("Please type any of the following commands: my-tweets spotify-this-song movie-this do-what-it-says.")
}

// function to get tweets
function myTweets() {
	// console.log('making sure myTweets runs')
//---debug: code32--could not authenticate you.  misspelled 'tiwitter' in keys.js---//
	// console.log(JSON.stringify(keys.twitter))
	var params = {screen_name: 'ucb_zeelee28'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    // console.log(tweets);
	    for (var i = 0; i < tweets.length; i++) {
	    	console.log('@'+tweets[i].user.screen_name+'\ntweeted: '+tweets[i].text)
	    	console.log('at '+tweets[i].created_at)
	    	console.log('===============================')
	    }
	  }else{console.log(error)}
	})
}
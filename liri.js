// console.log('liri.js--running')
require("dotenv").config()

// Let's make some variables

// export modules
var fs = require('fs')
var request = require('request')
var Twitter = require('twitter')
// var spotify = require('spotify')
// var SpotifyWebApi = require('spotify-web-api-node')
var Spotify = require('node-spotify-api')
var keys = require("./keys.js")
// variables to store commands and user inputs
var command = process.argv[2]
var userInput = process.argv[3]
// default searches when process.argv[3] is empty
var defaultSong = "The Sign"
var defaultMovie = "Mr. Nobody"
// variables to access keys
var client = new Twitter(keys.twitter)
// var spotify = new spotify(keys.spotify)
// var spotifyApi = new SpotifyWebApi(keys.spotify)
var spotify = new Spotify(keys.spotify)




//Let's create some switch case statements
function runCommand(argument) {
	// body...
switch(command){
	case 'my-tweets':
		console.log('retrieving tweets from @ucb_zeelee28...\n===============================')
		myTweets()
		break
	case 'spotify-this-song':
		if(userInput === undefined){
			userInput = defaultSong
		}
		console.log('searching Spotify for: '+userInput+'...\n===============================')     
		spotifyThis(userInput)
		break
	case'movie-this':
		if (userInput === undefined) {
			movieThis(defaultMovie)
			console.log("If you haven't watched "+'"Mr.Nobody," '+"then you should: http://www.imdb.com/title/tt0485947/\nIt's on Netflix!")
			break
		}
		console.log('searching omdb for: '+userInput+'...\n===============================')
		movieThis(userInput)
		break
	case 'do-what-it-says':
		doIt()
		break
	default: 
		console.log("Please type any of the following commands: my-tweets spotify-this-song movie-this do-what-it-says.")
}
}
runCommand()




// Let's make some functions

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
	    	console.log('@'+tweets[i].user.screen_name+' tweeted: \n\n'+tweets[i].text)
	    	console.log('\nat '+tweets[i].created_at)
	    	console.log('------------------------------')
	    }
	  }else{console.log(error)}
	})
}

function spotifyThis(song){
	spotify.search({ type: 'track', query: song }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err)
	  }
	  // console.log(data.tracks.items[0])
	  for (var i = 0; i < data.tracks.items.length; i++) {
	  console.log('Artist(s): '+data.tracks.items[i].artists[0].name)
	  console.log('Song Name: '+data.tracks.items[i].name)
	  console.log('Preview Link: '+data.tracks.items[i].preview_url)
	  console.log('Album: '+data.tracks.items[i].album.name)
	  console.log('------------------------------')
	}
	})
}

//function to look up movies in omdb
function movieThis(movie) {
	// body...
	// console.log('movieThis works')
	// console.log('searching ombd for: '+movie)
    var omdbURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece"
    request(omdbURL, function (error, response, body){
    	var data = JSON.parse(body)
    	// console.log(data)
    	console.log('Title: '+data.Title)
    	console.log('Year: '+data.Year)
    	console.log('IMDB rating: '+data.imdbRating)
    	console.log('Rotten Tomatoes rating: '+data.Ratings[1].Value)
    	console.log('Country: '+data.Country)
    	console.log('Language: '+data.Language)
    	console.log('Plot: '+data.Plot)
    	console.log('Actors: '+data.Actors)
	})
}

//function to run spotifyThis() on text in random.txt
function doIt() {
  	// We will read the existing random.txt file
  	fs.readFile("random.txt", "utf8", function(err, data) {
	    if (err) {
	      return console.log(err);
	    }
		// separate data into command and userInput
		data = data.split(",");
		// console.log(data)
		command = data[0]
		userInput = data[1]
		// console.log('command: '+command, 'userInput: ' +userInput)
		console.log('you want me to run '+command+' on '+userInput)
		runCommand(command)
	})
}

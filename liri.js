// console.log('liri.js--running')
require("dotenv").config()

// Let's make some variables

// export modules
var fs = require('fs')
var request = require('request')
var Twitter = require('twitter')
// var spotify = require('spotify')
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




switch(command){
	case 'my-tweets':
		myTweets();
		break;
	// case 'spotify-this-song':
	// 	//If user has not specified a song , use default
	// 	// if(userInput === undefined){
	// 	// 	userInput = defaultSong;
	// 	// }
	// 	// console.log('searching Spotify for: '+userInput)     
	// 	// spotifyThis(userInput);
	// 	spotifyThis()
	// 	break;
	case'movie-this':
		if (userInput === undefined) {
			movieThis(defaultMovie)
			console.log("If you haven't watched "+'"Mr.Nobody," '+"then you should: http://www.imdb.com/title/tt0485947/\nIt's on Netflix!")
			break
		}
		movieThis(userInput)
		break
	// case 'do-what-it-says':
	// 	doWhatItSays();
	// 	break;
	default: 
		console.log("Please type any of the following commands: my-tweets spotify-this-song movie-this do-what-it-says.")
}

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
	    	console.log('@'+tweets[i].user.screen_name+'\ntweeted: '+tweets[i].text)
	    	console.log('at '+tweets[i].created_at)
	    	console.log('===============================')
	    }
	  }else{console.log(error)}
	})
}

// // function to look up songs in spotify
// function spotifyThis(song){
// 	// console.log('making sure spotifyThis() runs')
// 	Spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
// 	    if ( err ) {
// 	        console.log('Error occurred: ' + err);
// 	        return;
// 	    }
	 
// 	    // Do something with 'data' 
// 	    console.log(data)
// 	});

// }

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


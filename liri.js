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


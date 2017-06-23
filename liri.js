"use strict";
(function(){
var request = require("request");

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');
var spotify = new Spotify({id: "f3def5c7d1ad4b289d9c1022ffaad070", secret: "63aad47916024a6c91753ddf1e8a5b18"});
var keys = require("./keys")
var fs = require("fs");
	
var action = process.argv[2];
var searchTerm  = process.argv[3];

var client = new Twitter({
  consumer_key: 'EyG7cskZNe3QQ7bnGRzfOyYnE',
  consumer_secret: 'xOcglcjZxHI0R0tTaQiOIxE4YDBUqvqNJLoxyRVJpOcRSxYw4N',
  access_token_key: '875389293337890816-slYOLsoswR0m6Q7zNl9hTSMi2UFYZSo',
  access_token_secret: 'usstcxmqv1DZSK6GLdBxmOqJr776gb7Qf4ZwAY6tqNLio',
});
var params = {ca987879_twitter: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    }
});

switch (action) {
	case "my-tweets":
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
   	console.log(tweets[0].text)
  }
});			
	break;
	case "spotify-this-song":			 
	 spotify.search({ type: "track", query: encodeURI(searchTerm), limit: 1 }, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);					
				} 	
			console.log("The artist is: " + data.tracks.items[0].artists[0].name);
			console.log("The song is: " + data.tracks.items[0].name); 
			console.log("The preview link is: " + data.tracks.items[0].preview_url);
			console.log("The album that this song is from: " + data.tracks.items[0].album.namcde); 
			console.log("JSON:  " + data.tracks.next);
			//console.log(data); 
			});
					console.log("spotify-this-song")		   
	break;
	case "movie-this":
		if (searchTerm === ""){
				searchTerm = "Mr. Nobody"
			}			
			request("http://www.omdbapi.com/?t=" + encodeURI(searchTerm) + "&y=&plot=short&apikey=40e9cece", function(error, response, body){
		if (!error && response.statusCode === 200) {
			console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
			console.log("The movie's title is: " + JSON.parse(body).Title);
			console.log("The year the movie came out is: " + JSON.parse(body).Year);
			console.log("The plot of the movie is: " + JSON.parse(body).Plot);
			console.log("The language of the movie is: " + JSON.parse(body).Language);
			console.log("The actors in the are: " + JSON.parse(body).Actors);
						//console.log("Rotten Tomatoes URL: " + JSON.parse(body).imdbRating);
  }})
;
			console.log("movie-this")
		    //movie-this();
	break;
	case "do-what-it-says":
			//doWhatitSays();
		fs.readFile("random.txt", "UTF8",  function(err,data){
			if (err) {
				return console.log(err);
			}
			data = data.split(",");
				var cmd = "node liri " + data[0] + " " + data[1]
				console.log(cmd)
				exec(cmd, function(error, stdout, stderr) {
				console.log(stdout);
				});
	})
			console.log("do-what-it-says")		
	break;
}
})();

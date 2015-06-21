var Twitter = require('twitter');

// TODO: Add config file (yaml?)
var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

function hometimeline() {
    return new Promise(function(resolve){
        client.get('statuses/home_timeline', {}, function(error, tweets, response){
            if (!error) {
                resolve(tweets);
            } else {
                console.log("error!");
            }
        });
    });
}

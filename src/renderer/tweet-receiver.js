'use strict';

var ipc = require('ipc');

var tweet_callbacks = [];

ipc.on('twitter-stream', function(tweet){
    for (let c of tweet_callbacks) {
        c(tweet);
    }
});
ipc.send('require-twitter-stream');

function on_tweet_received(callback) {
    tweet_callbacks.push(callback);
}

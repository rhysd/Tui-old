'use strict';

var ipc = require('ipc');

var callbacks = [];

ipc.on('twitter-stream', function(tweet){
    for (let c of callbacks) {
        c(tweet);
    }
});
ipc.send('require-twitter-stream');

function on_tweet_received(callback) {
    callbacks.push(callback);
}

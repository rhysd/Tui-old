'use strict';

var ipc = require('ipc');

var callbacks = [];

ipc.on('twitter-stream', function(tweet){
    const created_at = tweet.created_at;
    if (created_at !== undefined) {
        const d = new Date(created_at);
        tweet.created_at = `${d.getHours()}:${d.getMinutes()} ${d.getMonth()+1}/${d.getDate()} ${d.getYear() + 1900}`;
    }

    for (let c of callbacks) {
        c(tweet);
    }
});
ipc.send('require-twitter-stream');

function on_tweet_received(callback) {
    callbacks.push(callback);
}

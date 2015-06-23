var ipc = require('ipc');

var callbacks = [];
ipc.on('twitter-stream', function(tweet){
    for (var c of callbacks) {
        c(tweet);
    }
});
ipc.send('require-twitter-stream');

function on_tweet(callback) {
    callbacks.push(callback);
}

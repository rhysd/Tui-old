var ipc = require('ipc');

var callbacks = [];
ipc.on('twitter-stream', function(tweet){
    var created_at = tweet.created_at;
    if (created_at !== undefined) {
        var d = new Date(created_at);
        tweet.created_at = `${d.toLocaleTimeString()} ${d.getMonth()}/${d.getDate()} ${d.getYear() + 1900}`;
        console.log('date: ' + tweet.created_at);
    }

    for (var c of callbacks) {
        c(tweet);
    }
});
ipc.send('require-twitter-stream');

function on_tweet(callback) {
    callbacks.push(callback);
}

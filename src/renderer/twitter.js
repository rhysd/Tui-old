var ipc = require('ipc');

var callbacks = [];
ipc.on('twitter-stream', function(tweet){
    var created_at = tweet.created_at;
    if (created_at !== undefined) {
        var d = new Date(created_at);
        tweet.created_at = `${d.getHours()}:${d.getMinutes()} ${d.getMonth()+1}/${d.getDate()} ${d.getYear() + 1900}`;
    }

    for (var c of callbacks) {
        c(tweet);
    }
});
ipc.send('require-twitter-stream');

function on_tweet(callback) {
    callbacks.push(callback);
}

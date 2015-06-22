var Twitter = require('twitter');
var ipc = require('ipc');

var client = null;
function get_client() {
    if (client !== null) {
        return Promise.resolve(client);
    } else {
        return new Promise(function(resolve, reject){
            var response = ipc.sendSync('require-config');
            if (!('credentials' in response)) {
                console.error('timeline.js: Invalid configuration: No \'credentials\' config is found/: ' + response);
                reject('invalid ipc response');
            }

            var keys = response.credentials;

            client = new Twitter({
                consumer_key:        keys.consumer_key,
                consumer_secret:     keys.consumer_secret,
                access_token_key:    keys.access_token_key,
                access_token_secret: keys.access_token_secret
            });

            console.log('timeline.js: get_config: success');
            resolve(client);
        });
    }
}

function request(client) {
    return new Promise(function(resolve, reject){
        client.get('statuses/home_timeline', {}, function(error, tweets, response){
            if (!error) {
                console.log('statuses/home_timeline: success');
                resolve(tweets);
            } else {
                console.log('statuses/home_timeline failed: ' + response);
                reject(response);
            }
        });
    });
}

function home_timeline() {
    return get_client().then(request);
}

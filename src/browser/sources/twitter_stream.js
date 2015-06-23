'use strict';

var Twitter = require('twitter');
var app = require('app');
var config = require('../config.js');

var client = null;
var subscribers = [];

class TwitterStream {

    static twitter_client() {
        if (client !== null) {
            return client;
        }

        var user_config = config.load(app.getPath('userData'));
        if (!('credentials' in user_config)) {
            console.error('twitter_stream.js: Invalid configuration: No \'credentials\' config is found/: ' + user_config);
            this.client = null;
            return;
        }

        var keys = user_config.credentials;
        client = new Twitter({
            consumer_key:        keys.consumer_key,
            consumer_secret:     keys.consumer_secret,
            access_token_key:    keys.access_token_key,
            access_token_secret: keys.access_token_secret
        });

        console.log('twitter_stream.js: create client: success');
        return client;
    }

    connect_stream() {
        if (this.stream_connected || this.client === null) {
            return;
        }

        // Note: I can remove below using ES6 arrow function
        var self = this;

        this.client.stream(this.path, {}, function(stream){

            stream.on('data', function(data){
                if ('friends' in data) {
                    return;
                }

                for (var s of self.subscribers) {
                    s(data);
                }
            });

            stream.on('error', function(error){
                console.error('twitter_stream: ERROR!: ' + error);
            });
        });

        this.stream_connected = true;
    }

    constructor(path) {
        this.path = path;
        this.stream_connected = false;
        this.subscribers = [];
        this.client = TwitterStream.twitter_client();
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
        this.connect_stream();
    }

}

module.exports = TwitterStream;

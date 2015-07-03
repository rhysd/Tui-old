'use strict';

var app = require('app');
var path = require('path');
var BrowserWindow = require('browser-window');
var config = require('./config.js').load(app.getPath('userData'));
var ipc = require('ipc');
var TwitterStream = require('./sources/twitter_stream.js');
var shortcut = require('global-shortcut');


require('crash-reporter').start();

// Main Window {{{
var mainWindow = null;

app.on('window-all-closed', function(){ app.quit(); });

app.on('ready', function(){
    mainWindow = new BrowserWindow({width: 800, height: 600});

    const html = 'file://' + path.resolve(__dirname, '..', '..', 'static', 'index.html');
    mainWindow.loadUrl(html);

    mainWindow.openDevTools();

    mainWindow.on('closed', function(){
        mainWindow = null;
        shortcut.unregisterAll();
    });
});
// }}}

// IPC {{{
ipc.on('require-config', function(event, arg){ // Sync
    console.log('main: reply-config');
    event.returnValue = config;
});

var twitter_stream_receivers = [];
ipc.on('require-twitter-stream', function(event){
    twitter_stream_receivers.push(event.sender);
});

var stream = new TwitterStream('user');
stream.subscribe(function(tweet){
    for (let recv of twitter_stream_receivers) {
        recv.send('twitter-stream', tweet);
    }
});
stream.connect_stream({fetch: 'statuses/home_timeline'});

var keyinput_receivers = {};
ipc.on('register-key-input', function(event, key){
    if (key in keyinput_receivers) {
        keyinput_receivers[key].push(event.sender);
        return;
    }

    keyinput_receivers[key] = [event.sender];
    shortcut.register(key, function(){
        for (let recv of keyinput_receivers[key]) {
            recv.send('key-input', key);
        }
    });
});

// }}}



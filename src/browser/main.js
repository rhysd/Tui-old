var app = require('app');
var path = require('path');
var BrowserWindow = require('browser-window');
var config = require('./config.js').load(app.getPath('userData'));
var ipc = require('ipc');


require('crash-reporter').start();

// Main Window {{{
var mainWindow = null;

app.on('window-all-closed', function(){ app.quit(); });

app.on('ready', function(){
    mainWindow = new BrowserWindow({width: 800, height: 600});

    html = 'file://' + path.resolve(__dirname, '..', '..', 'static', 'index.html');
    mainWindow.loadUrl(html);

    mainWindow.on('closed', function(){
        mainWindow = null;
    });
});
// }}}

// IPC {{{
ipc.on('require-config', function(event, arg){ // Sync
    console.log('main: reply-config');
    event.returnValue = config;
});
// }}}



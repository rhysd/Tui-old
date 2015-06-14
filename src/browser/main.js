var app = require('app');
var path = require('path');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

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

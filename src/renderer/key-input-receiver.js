'use strict';

var ipc = require('ipc');
var input_callbacks = {};

function registerKeyinput(key, callback) {
    if (key in input_callbacks) {
        input_callbacks[key].push(callback);
        return;
    }

    input_callbacks[key] = [callback];

    ipc.on('key-input', function(keyinput){
        for (let c of input_callbacks[key]) {
            c(keyinput);
        }
    });

    ipc.send('register-key-input', key);
}

var ipc = require('ipc');

function get_config() {
    return ipc.sendSync('require-config');
}

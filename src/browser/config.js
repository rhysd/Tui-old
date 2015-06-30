var yaml = require('js-yaml');
var path = require('path');
var fs = require('fs');

// Note:
// Add Config class to allow to deal with default config and user
// customization

module.exports.load = function(dir){
    const file = path.join(dir, 'config.yml');
    try {
        return yaml.load(fs.readFileSync(file));
    } catch(e) {
        console.log('No configuration file is found: ' + e);
        console.log('If you want to customize this app, please create ' + file);
        return {};
    }
};

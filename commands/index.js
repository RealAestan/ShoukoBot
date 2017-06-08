const fs    = require('fs');
const files = fs.readdirSync(__dirname);

module.exports = {};

for (let file of files) {
    if (file !== 'index.js' && file !== 'command.js') {
        module.exports[file.replace('.js', '')] = new (require('./' + file));
    }
}
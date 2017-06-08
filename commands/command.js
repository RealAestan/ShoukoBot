const escapeCommandName = require('escape-string-regexp');

/**
 * This is the base for each command
 */
class Command {
    /**
     * Base constructor of every commands
     * @param name
     * @param description
     */
    constructor (name, description) {
        this.prefix      = '*';
        this.name        = name;
        this.description = description;
    }

    /**
     * Checks if message match the command
     * @param message
     */
    match (message) {
        return new RegExp('^' + escapeCommandName(this.prefix + this.name) + '($| )').exec(message.content);
    }

    /**
     * Returns given arguments in the command
     * @param message
     * @returns {Array.<*>}
     */
    getArguments(message) {
        let stringArgs = message.content.replace(this.prefix + this.name, '');
        return stringArgs.split(' ').filter(x => x !== '');
    }
}

module.exports = Command;
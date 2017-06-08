const discord      = require('discord.js');
const fs           = require('fs');
const youtubeQueue = require('./youtube/queue');
const parameters   = JSON.parse(fs.readFileSync('./parameters.json', 'utf8'));
const shouko       = youtubeQueue.client = new discord.Client();
const commands     = require('./commands');

// connect shouko to discord
shouko.login(parameters.tokens.discord);
// listen for incoming messages
shouko.on('message', message => {
    // check if a command match the last message sent
    for (let commandName of Object.keys(commands)) {
        let command = commands[commandName];
        if (command.match(message)) {
            command.execute(message);
        }
    }
});
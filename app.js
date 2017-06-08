const Discord    = require('discord.js');
const fs         = require('fs');
const parameters = JSON.parse(fs.readFileSync('./parameters.json', 'utf8'));
const shouko     = new Discord.Client();

shouko.login(parameters.tokens.discord);
shouko.on('message', msg => {
    if (msg.content.startsWith('ping')) {
        msg.reply('pong!');
    }
});
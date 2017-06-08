const discord = require('discord.js');

/**
 * Retrieves the sender's current voice channel
 * @param user
 * @returns {*}
 */
function getUserChannel(user) {
    for (let channel of user.channels.array()) {
        if (channel instanceof discord.VoiceChannel) {
            return channel;
        }
    }

    return null;
}

module.exports = {
  getUserChannel
};
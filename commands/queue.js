const Command          = require('./command');
const {getUserChannel} = require('../utils');
const queue            = require('../youtube/queue');

/**
 * Command that allows you to add songs to the queue and and play it if there is no songs inside it
 */
class QueueCommand extends Command {
    constructor() {
        super('music:queue');
    }

    execute(message) {
        const voiceChannel = getUserChannel(message.guild);
        const youtubeVideo = this.getArguments(message)[0];
        voiceChannel.join()
            .then(function () {
                queue.add(youtubeVideo);
                queue.play();
            })
            .catch((e) => {
                console.log(e);
            });
    }
}

module.exports = QueueCommand;
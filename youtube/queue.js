const ytdl = require('ytdl-core');

/**
 * Empty the queue and stop the current video streamed
 */
function empty() {
    this.videos = [];
    this.stream.end();
    this.streamDispatcher.end();
    this.playing = false;
}

/**
 * Add a youtube video to the queue
 * @param video
 */
function add(video) {
    if (this.videos === undefined) {
        this.videos = [];
    }
    this.videos.push(video);
}

/**
 * Skip the current video streamed and play the next one
 */
function skip() {
    this.streamDispatcher.end();
}

/**
 * Loop on queued videos and play the next one in the queue when the current video is finished
 */
function play() {
    if (this.videos.length === 0) {
        this.playing = false;
    }

    if (this.playing !== true) {
        this.playing          = true;
        let currentVideo      = this.videos.shift();
        let connection        = this.client.voiceConnections.first();
        let audioStream       = ytdl(currentVideo, {filter: 'audioonly'});
        this.streamDispatcher = connection.playStream(audioStream, {seek: 0, volume: 1});

        this.streamDispatcher.on('end', () => {
            this.playing = false;
            play();
        });

        this.stream = audioStream;
    }
}

module.exports = {
    empty,
    skip,
    play,
    add
};
class YoutubeHelpers {
    onReady = (event) => {
        // tell the player to play the video
        event.target.playVideo();
    }
}

export default new YoutubeHelpers();
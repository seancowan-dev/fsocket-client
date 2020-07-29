import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import LocalHelpers from '../local/helpers/helpers';
import LocalSession from '../local/helpers/session';
import socketIOClient from 'socket.io-client';
import config from '../../config';
import uuid from 'uuid';
import ScrollText from 'react-scroll-text';

const ENDPOINT = config.SOCKET_URL;

const Playlist = inject('roomStore', 'sessionStore')(observer((props) => {
    const socket = socketIOClient(ENDPOINT); // Socket.io object

    let roomOwner = props.roomStore.getRoomOwner(props.room_id);
    
    let currentPlaylist = props.sessionStore.getCurrentRoomPlaylist; // Get the computed playlists from the MobX store
    let playlistObjects; // Placeholder variable to hold the playlist objects if they exist
    if (currentPlaylist !== undefined) { // If there are playlist objects, set them to be displayed
        playlistObjects = currentPlaylist;
    }

    let checkPlaying = () => { // The youtube player container will hold the ID of the currently playing video, get it
        let el = document.querySelector('.youtube-video-player-container');
        return el.id;
    }

    useEffect(() => { // When the a new item has been added to the playlist
        socket.on("playlistEntryAdded", entries => { // Capture instruction from Socket.io
            let listData = props.roomStore.updateRoomPlaylist(props.room_id, entries.items); // Add the new entry(s) into the room store, and return them to map for display
            let listObjects = listData.map(obj => { // Map the updated list entries
            return <div 
                    className="room-play-list-row" 
                    key={uuid.v4()} 
                    id={obj.id} // This is the id of the YT vid
                    onClick={(event) => {
                        let listEntry = { // Make a basic list entry
                            room_id: props.room_id,
                            video_path: obj.id
                        }
                        if (LocalSession.getUserName() === roomOwner) { // Only let the room host play videos
                            socket.emit('loadVideo', listEntry); // Emit to the socket so all room members videos play at the same time
                        }
                    }}>
                        <ScrollText // Scroll the title incase it is long - snippet.localized.title will automatically pull the localized title
                            className="playlist-grid-item" 
                            speed={50}>{obj.snippet.localized.title}
                        </ScrollText>
                        <p className="playlist-grid-item">
                            {LocalHelpers.convertISOTime(obj.contentDetails.duration)}
                        </p>
                        <p className="playlist-grid-item">
                            {LocalHelpers.isVideoPlaying(obj.id, checkPlaying())}
                        </p>
                    </div>
            });           
            props.sessionStore.setCurrentRoomPlaylist(listObjects); // Playlist data is ready to display to the client
        });
    }, [props.sessionStore, socket, props.roomStore, props.room_id]);

    useEffect(() => { // When the room first loads we should get the current playlist (this is essentially the same as above)
        socket.on("retrievedPlaylistEntries", newEntries => { // Capture instruction from Socket.io
            if (props.room_id === newEntries.fromRoom) { // Only do something in the specified room
                let listData = props.roomStore.updateRoomPlaylist(props.room_id, newEntries.items); // Add the entry(s) into the room store, and return them to map for display
                let listObjects = listData.map(obj => {
                return <div 
                            className="room-play-list-row" 
                            key={uuid.v4()} 
                            id={obj.id} // This is the id of the YT vid
                            onClick={(event) => {
                                let listEntry = { // Make a basic list entry
                                    room_id: props.room_id,
                                    video_path: obj.id
                            }
                            if (LocalSession.getUserName() === roomOwner) { // Only let the room host play videos
                                socket.emit('loadVideo', listEntry); // Emit to the socket so all room members videos play at the same time
                            }
                        }}>
                        <ScrollText // Scroll the title incase it is long - snippet.localized.title will automatically pull the localized title
                            className="playlist-grid-item" 
                            speed={50}>{obj.snippet.localized.title}
                        </ScrollText>
                        <p className="playlist-grid-item">
                            {LocalHelpers.convertISOTime(obj.contentDetails.duration)}
                        </p>
                        <p className="playlist-grid-item">
                            {LocalHelpers.isVideoPlaying(obj.id, checkPlaying())}
                        </p>
                        </div>
                });
                props.sessionStore.setCurrentRoomPlaylist(listObjects); // Playlist data is ready to display to the client
            }
        });
    }, [props.sessionStore, socket, props.roomStore, props.room_id]);
    return (
        <div className="room-playlist" key={uuid.v4()}>
            <div className="room-play-list-row-head">
                <p className="playlist-grid-header-item">Title</p>
                <p className="playlist-grid-header-item">Duration</p>
                <p className="playlist-grid-header-item">Playing</p>
            </div>
            {playlistObjects}
        </div>
    );
}));

export default Playlist;
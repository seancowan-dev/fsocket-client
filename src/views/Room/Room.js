import React, { useEffect, useState } from 'react';
import Chat from '../../view_comps/Chat/Chat';
import Nav from '../../view_comps/Navigation/Nav';
import { inject, observer } from 'mobx-react';
import config from '../../config';
import RoomService from '../../services/room.service';
import LocalSession from '../../view_comps/local/helpers/session';
import Slide from '../../view_comps/Splash/splash-comps/Slide';
import NewHostModal from '../../view_comps/Room/comps/SelectNewHostModal';
import YouTube from 'react-youtube';
import Playlist from '../../view_comps/Room/Playlist';
import SessionHelpers from '../../view_comps/local/helpers/session';
import YoutubeHelpers from '../../view_comps/local/helpers/youtube';
import Serializers from '../../serializers/serializers';
import socketIOClient from 'socket.io-client';
import { navigate } from 'hookrouter';
import uuid from 'uuid';
const ENDPOINT = config.SOCKET_URL;

const Room = inject('sessionStore', 'roomStore', 'uxcStore')(observer((props) => {
    let currentOwner = null;
    const socket = socketIOClient(ENDPOINT);

    // If the user is joining this room without having hit the main page then the 
    // methods that are called to display the room list must also be called here
    if (SessionHelpers.checkUser() === false) { // Check if the user is registered already
        SessionHelpers.registerUser(); // If not register the user
    }

    // Now its safe to add the user to the room
    RoomService.addUserToRoom(Serializers.member(props.uuid, LocalSession.getUserID(), LocalSession.getUserName()));

    useEffect(() => { // Tell the client to emit the event to get playlists
        socket.emit('getPlaylist', props.uuid);
    });
    
    // Now that the user has been added its time to get the room info for that user
    useEffect(() => { // Tell the client to emit the event to get rooms
        socket.on("connected", data => {
            RoomService.getAllRooms();
        });
    }, [socket]);

    useEffect(() => { // When the socket sends back rooms display them
        socket.on("receiveAllRooms", rooms => { // Capture event from Socket.io
            if (rooms.rowCount > 0) { // Only do something if there are actually rows to parse
                props.roomStore.processRoomRows(rooms.rows); // Call the processor function
            }
        });
    }, [socket, props.roomStore]);

    // If the host changes hosts the room should know this happened
    useEffect(() => {
        socket.on("roomOwnerUpdated", data => { // Capture event from Socket.io
            props.roomStore.changeRoomOwner(props.uuid, data); // Change the room owner to the new owner coming from the socket
        })
    }, [socket, props.roomStore, props.uuid]);

    // Set the state to help control the currently playing video
    const [playing, setPlaying] = useState();

    // Loads and plays the selected video from the playlist for all room members
    useEffect(() => {
        socket.on('videoLoaded', (vid_code) => { // Capture instruction from Socket.io
            if (vid_code.room_id === props.uuid) { // If the incoming event contains the same room ID as the room running this script
                setPlaying(vid_code.video_path); // Then set the playing state to the appropriate path
            }
        });
    }, [socket, props.uuid]);

    // If a message is sent update the room messages for all room members
    useEffect(() => {
        socket.on("messageSent", message => { // Capture instruction from Socket.io
            socket.emit("getRoomMessages", message.room_id); // Send the room ID to the socket, so it can emit to the client with the updated message for all users
        });
    }, [socket]);

    // If room messages are received display them
    useEffect(() => {
        socket.on("receiveMessages", messages => { // Capture instruction from Socket.io
            props.roomStore.setRoomMessages(messages, props.uuid); // Set the messages in the room with the appropriate ID
        });
    }, [socket, props.uuid, props.roomStore]);

    const opts = { // Prepare the base opts for the youtube player
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        },
      };

    let player = <YouTube // Youtube player
        className="youtube-video-player" 
        videoId={playing} // ID of the currently playing video
        opts={opts} 
        onReady={YoutubeHelpers.onReady} // When the video is in ready state, begin playback for all room members
    />

    if (props.roomStore.rooms.length) { // If there are rooms to check
        currentOwner = props.roomStore.getRoomOwner(props.uuid).owner === LocalSession.getUserName() ? true : false; // Check the current owner of this room
    }

    let leaveRoom = <button  // Controls leaving the room
                        className="leave-room-button room-nav-buttons"
                        onClick={(e) => {
                            // Disconnects the user from the service and returns them to the main page under a new user ID
                            RoomService.removeUserFromRoom(Serializers.member(props.uuid, LocalSession.getUserID(), LocalSession.getUserName())); // Remove the user from the room store for this room
                            navigate("/", true);
                        }}
                    >Leave Room</button>
    let closeRoom = <button // Controls closing the room
                        className="close-room-button room-nav-buttons"
                        onClick={(e) => {
                            // Closes this room and returns the host to the main page
                            // Other room users will see an error message and be directed to the main page as well
                            RoomService.deleteRoom(props.uuid); // Delete this room entirely from fsocket
                            navigate("/", true);
                        }}
                    >Close Room</button>
    let updateRoom = <button // Opens a modal to let the host chose a new host
                    className="change-room-host-button room-nav-buttons"
                    onClick={(e) => {
                            // Opens up the SelectNewHost Modal to chose a new host
                            props.uxcStore.openHostModal(props.uxcStore.getSelectHostModalState); // Display the modal to select a new host
                        }}
                    >Change Host</button>

    if (LocalSession.checkUser() === true) {

        return (<>
            <Nav />
            <Slide />
            <NewHostModal room_id={props.uuid}/>
            <div 
                className="room-container" 
                key={uuid.v4()}
            >
                <div 
                    className="youtube-video-player-container" 
                    id={playing}
                >
                {player}
                </div>
                <Playlist 
                    room_id={props.uuid} 
                    playing={playing}
                />
                <Chat 
                    key={uuid.v4()} 
                    uuid={props.uuid}
                />
            </div>
            <div className="room-footer">
                {leaveRoom /* Any user can leave  the room */} 
                {currentOwner === true ? closeRoom : "" /* Host only */}
                {currentOwner === true ? updateRoom : "" /* Host only */}
            </div>
        </>
        ); 
    }
    if (LocalSession.checkUser() === false) {
        // If the user has left the room send them back to the main page
        navigate("/", true);
    }
   
}));

export default Room;
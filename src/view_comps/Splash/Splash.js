import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import config from '../../config';
import Logo from './splash-comps/Logo';
import RoomList from './splash-comps/RoomList';
import RoomService from '../../services/room.service';
import socketIOClient from 'socket.io-client';
const ENDPOINT = config.SOCKET_URL;

const Splash = inject('sessionStore', 'roomStore')(observer((props) => {
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("connected", data => { // When the socket first connects
            RoomService.getAllRooms(); // Get all the rooms
        });
    }, [props.roomStore]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("roomDeleted", id => { // Capture instruction from Socket.io
            props.roomStore.deleteRoom(id);
        });
    }, [props.roomStore]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("receiveAllRooms", rooms => { // Capture event from Socket.io
            if (rooms.rowCount > 0) { // Only do something if there are actually rows to parse
                props.roomStore.processRoomRows(rooms.rows); // Call the processor function
            }
        });
    }, [props.roomStore]);

    useEffect(() => {  // Updates the room list to add the new room
        const socket = socketIOClient(ENDPOINT);
        socket.on("roomCreated", room => { // Capture event from Socket.io
            if (room.rowCount > 0) { // Only do something if there are actually rows to parse
                props.roomStore.processRoomRows(room.rows); // Call the processor function
            }
        });
    }, [props.roomStore]);

    useEffect(() => {  
        const socket = socketIOClient(ENDPOINT);
        socket.on("roomOwnerUpdated", data => { // Capture event from Socket.io
            props.roomStore.changeRoomOwner(props.uuid, data.owner); // Change the room owner in the room store
        })
    }, [props.roomStore, props.uuid]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("userAddedToRoom", data => { // Capture event from Socket.io
            props.roomStore.userAddedToRoom(data); // Add a user to the room store
        })
    }, [props.roomStore])

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("removedUserFromRoom", data => { // Capture event from Socket.io
            props.roomStore.removeUserFromRoom(data); // Remove a user from the room store
        })
    }, [props.roomStore])

    return (<div className="splash container">
            <div className="image">
                <Logo />
            </div>
            <section className="about">
                <h1>Welcome to fSocket!</h1>
                <br />
                <p>You're only a few clicks away from being able to watch real-time YouTube videos with your friends or colleagues.  No accounts just straight to the point video playback.</p>
                <br />
                <br />
                <h3>How to use fSocket</h3>
                <br />
                <ul>
                    <li><p>1. Click the Create Room button just below these instructions.  Enter a name and a description in the pop-up and click Create Room.</p></li>
                    <li><p>2. Your newly created room will appear in the list, click on the room to join it.</p></li>
                    <li><p>3. Copy and paste the room URL exactly as it appears and share it with others.</p></li>
                    <li><p>4. Once in the room anyone can paste a YouTube URL directly into the chat, this will add the video to the playlist.</p></li>
                    <li><p>5. You (the room host) will be able to pick any video from the playlist.  When you do it will play for everyone in the room at the same time.</p></li>
                    <li><p>6. Click the Change Host button in the lower left-hand corner of the room and you can pass off control to another person if you desire.</p></li>
                </ul>
            </section>
            <button className="create-new-room standard-button" onClick={(e) => {
                    e.preventDefault();
                    props.sessionStore.setLastUserScroll(window.pageXOffset, window.pageYOffset);
                    window.scrollTo(0,0);
                    props.sessionStore.setModalDisplay("block"); // Set modal display to block so it appears
            }}>Create Room</button>
            <RoomList />
        </div>
    );
}));

export default Splash;
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
            props.roomStore.changeRoomOwner(props.uuid, data); // Change the room owner in the room store
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
            <button className="create-new-room standard-button" onClick={(e) => {
                    e.preventDefault();
                    props.sessionStore.setModalDisplay("block"); // Set modal display to block so it appears
            }}>Create Room</button>
            <RoomList />
        </div>
    );
}));

export default Splash;
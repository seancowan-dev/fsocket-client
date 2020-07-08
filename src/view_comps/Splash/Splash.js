import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import config from '../../config';
import Logo from './splash-comps/Logo';
import RoomList from './splash-comps/RoomList';
import RoomService from '../../services/room.service';
import Serializers from '../../serializers/serializers';
import socketIOClient from 'socket.io-client';
const ENDPOINT = config.SOCKET_URL;

const Splash = inject('sessionStore', 'roomStore')(observer((props) => {

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("connected", data => {
            RoomService.getAllRooms();
        });
    }, []);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("roomDeleted", id => { // Capture instruction from Socket.io
            props.roomStore.deleteRoom(id);
        });
    }, []);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("receiveAllRooms", rooms => { // Capture instruction from Socket.io
            if (rooms.rowCount > 0) {
                props.roomStore.processRoomRows(rooms.rows);
            }
        });
    }, []);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("roomCreated", room => { // Capture instruction from Socket.io
            if (room.rowCount > 0) {
                props.roomStore.processRoomRows(room.rows);
            }
        });
    }, []);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("userAddedToRoom", data => {
            if (data !== false) {
                props.roomStore.userAddedToRoom(data);
            }
            if (data === false) {
                // put validation here later for when user already exists
            }
        });
    }, []);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("removedUserFromRoom", data => {
            if (data !== false) {
                props.roomStore.removeUserFromRoom(data);
            }
            if (data === false) {
                // put validation here later for when user already exists
            }
        });
    }, []);

    return (<div className="splash container">
            <div className="image">
                <Logo />
            </div>
            <button className="create-new-room" onClick={(e) => {
                    e.preventDefault();
                    props.sessionStore.setModalDisplay("block");
            }}>Create Room</button>
            <RoomList />
        </div>
    );
}));

export default Splash;
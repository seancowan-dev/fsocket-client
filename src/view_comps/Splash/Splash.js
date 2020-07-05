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
        socket.on("connected", data => {
            RoomService.getAllRooms();
        });
    }, []);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("receiveAllRooms", rooms => { // Capture instruction from Socket.io
            if (rooms.rowCount > 0) {
                RoomService.processRooms(rooms);
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
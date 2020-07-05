import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import config from '../../../config';
import ListRooms from './ListRooms';
import ControlButtons from './ControlButtons';
import MediaQuery from 'react-responsive';
import socketIOClient from 'socket.io-client';
const ENDPOINT = config.SOCKET_URL;

const RoomList = inject('helpers', 'sessionStore', 'roomStore')(observer((props) => {

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("roomCreated", data => {
            props.roomStore.listRoom(data);
        });
    }, []);

    props.helpers.ipLookUp().then(res => {
        props.sessionStore.setIpInfo(res);
    }); // get the user's location info for flag display

    // Mobile and tablet users have stacked tiles of divs
    // larger sizes have actual tables 

    return (<><MediaQuery maxWidth={768}><div className="room-list-container">
                    <div className="room-list">
                        <h3 className="room-list-title">Room List</h3>
                        <ListRooms />
                    </div>
                    <ControlButtons />
                </div>
                </MediaQuery>
                <MediaQuery minWidth={769}>
                <div className="room-list-container">
                    <table className="room-list">
                        <caption className="room-list-title">Room List</caption>
                        <thead className="room-list-head">
                        <tr>
                            <th>Location</th>
                            <th>Name</th>
                            <th># of Users</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                        <ListRooms />
                    </table>
                    <ControlButtons />
                </div>
                </MediaQuery></>);
}));

export default RoomList;
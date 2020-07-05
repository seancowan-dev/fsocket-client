import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import config from '../../../config';
import uuid from 'uuid';
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

    return (<React.Fragment>
                <MediaQuery 
                key={uuid.v4()} 
                maxWidth={768}
                >
                    <div 
                        key={uuid.v4()} 
                        className="room-list-container"
                    >
                        <div 
                            key={uuid.v4()} 
                            className="room-list"
                        >
                            <h3 
                                key={uuid.v4()} 
                                className="room-list-title"
                            >
                                Room List
                            </h3>
                            <ListRooms />
                    </div>
                    <ControlButtons />
                </div>
                </MediaQuery>
                <MediaQuery 
                    key={uuid.v4()} 
                    minWidth={769}
                >
                <div 
                    key={uuid.v4()} 
                    className="room-list-container"
                >
                    <table 
                        key={uuid.v4()} 
                        className="room-list"
                    >
                        <caption 
                            key={uuid.v4()} 
                            className="room-list-title"
                        >
                            Room List
                        </caption>
                        <thead 
                        key={uuid.v4()} 
                        className="room-list-head"
                        >
                            <tr key={uuid.v4()}>
                                <th key={uuid.v4()}>
                                    Location
                                </th>
                                <th key={uuid.v4()}>
                                    Name
                                </th>
                                <th key={uuid.v4()}>
                                    # of Users
                                </th>
                                <th key={uuid.v4()}>
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <ListRooms />
                    </table>
                    <ControlButtons />
                </div>
                </MediaQuery>
            </React.Fragment>);
}));

export default RoomList;
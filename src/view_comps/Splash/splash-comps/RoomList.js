import React from 'react';
import { inject, observer } from 'mobx-react';
import ListRooms from './ListRooms';
import MediaQuery from 'react-responsive';

const RoomList = inject('helpers', 'sessionStore')(observer((props) => {
    // Mobile and tablet users have stacked tiles of divs
    // larger sizes have actual tables 

    return (<><MediaQuery maxWidth={768}><div className="room-list-container">
                    <div className="room-list">
                        <h3 className="room-list-title">Room List</h3>
                        <ListRooms />
                    </div>
                </div>
                </MediaQuery>
                <MediaQuery minWidth={769}>
                <div className="room-list-container">
                    <h3 className="room-list-title">Room List</h3>
                    <div className="room-list">
                        <div className="room-list-head">
                        <div className="inner-room-list-head">
                            <div>Name</div>
                            <div># of Users</div>
                            <div>Description</div>
                        </div>
                    </div>
                        <ListRooms />
                    </div>
                </div>
                </MediaQuery></>);
}));

export default RoomList;
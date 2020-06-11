import React from 'react';
import { inject, observer } from 'mobx-react';
import ListRooms from './ListRooms';
import ControlButtons from './ControlButtons';
import LocalHelpers from '../../local/helpers/helpers';
import MediaQuery from 'react-responsive';

const RoomList = inject('helpers', 'sessionStore')(observer((props) => {
    LocalHelpers.ipLookUp(); // get the user's location info for flag display
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
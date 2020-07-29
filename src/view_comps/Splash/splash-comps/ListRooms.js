import React from 'react';
import { inject, observer } from 'mobx-react';
import { navigate } from 'hookrouter';
import uuid from 'uuid';
import MediaQuery from 'react-responsive';
import ScrollText from 'react-scroll-text';

const RoomList = inject('sessionStore', 'roomStore', 'helpers')(observer((props) => {

    if (props.roomStore.rooms !== undefined) { // Wait until we have user location info to render
        let rooms = props.roomStore.rooms.map((roomObject) => {
            // Mobile and tablet users have stacked tiles of divs
            // larger sizes have actual tables  
    
            // User count depends on API functions and websockets so for now it is a dummy 
            // For now flags are only displaying the flag of the user viewing the page; later once room API is done, they will show flag of room host origin
            return (<React.Fragment key={uuid.v4()}>
                <MediaQuery 
                    maxWidth={768}
                >
                    <div 
                        key={uuid.v4()} 
                        className="room-details" 
                        onClick={(e) => {
                            navigate(`/site/room/${roomObject.id}`);
                        }}
                    >
                            <p 
                                className="room-name" 
                                id={roomObject.id}
                            >
                                {roomObject.name}
                            </p>
                            <p 
                                className="room-users-count"
                            >
                                {roomObject.members.length}/8
                            </p>
                            <ScrollText 
                                className="room-description" 
                                speed={50}
                            >
                                {roomObject.description}
                            </ScrollText>
                    </div>
                </MediaQuery>
                <MediaQuery 
                    minWidth={769}
                >
                            <tr 
                                key={uuid.v4()} 
                                className="room-details" 
                                onClick={(e) => {
                                    navigate(`/site/room/${roomObject.id}`);
                                }}
                            >
                            <td 
                                className="room-name" 
                                id={roomObject.id}
                            >
                                {roomObject.name}
                            </td>
                            <td 
                                className="room-users-count"
                            >
                                {roomObject.members.length}/8
                            </td>
                            <td 
                                className="room-description"
                            >
                                {roomObject.description}
                            </td>
                        </tr>
                </MediaQuery>
            </React.Fragment>);
            });
            
        return <>
            <MediaQuery minWidth={769}>
                <tbody key={uuid.v4()}>{rooms}</tbody>
            </MediaQuery>
            <MediaQuery maxWidth={768}>
                <div key={uuid.v4()}>{rooms}</div>
            </MediaQuery>
        </>; 
    }
}));

export default RoomList;
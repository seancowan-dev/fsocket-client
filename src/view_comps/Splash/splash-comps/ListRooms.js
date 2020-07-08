import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { navigate } from 'hookrouter';
import uuid from 'uuid';
import Serializers from '../../../serializers/serializers';
import RoomService from '../../../services/room.service';
import LocalSession from '../../local/helpers/session';
import MediaQuery from 'react-responsive';
import ScrollText from 'react-scroll-text';

const RoomList = inject('sessionStore', 'roomStore', 'helpers')(observer((props) => {

    if (props.sessionStore.getUserLocale !== undefined) { // Wait until we have user location info to render
        let rooms = props.roomStore.rooms.map((roomObject) => {
            // Mobile and tablet users have stacked tiles of divs
            // larger sizes have actual tables  
    
            // User count depends on API functions and websockets so for now it is a dummy 
            // For now flags are only displaying the flag of the user viewing the page; later once room API is done, they will show flag of room host origin
            // process.env.VERCEL_URL + 
            return (<React.Fragment key={uuid.v4()}><MediaQuery maxWidth={768}><div key={uuid.v4()} className="room-details" onClick={(e) => {
                RoomService.addUserToRoom(Serializers.member(roomObject.id, LocalSession.getUserID()))
                navigate(`/site/room/${roomObject.id}`);
            }}>
                        <p className="room-name" id={roomObject.id}>{roomObject.name}</p>
                        <p className="room-location"><img src={'/assets/flags/32x32/' + props.sessionStore.getUserLocale + ".png"} /></p>
                        <p className="room-users-count">{roomObject.memberCount <= 0 ? 0 : roomObject.memberCount}/8</p>
                        <ScrollText className="room-description" speed={50}>{roomObject.description}</ScrollText>
                    </div>
                    </MediaQuery>
                    <MediaQuery minWidth={769}>
                        <tr key={uuid.v4()} className="room-details" onClick={(e) => {
                            RoomService.addUserToRoom(Serializers.member(roomObject.id, LocalSession.getUserID()))
                            navigate(`/site/room/${roomObject.id}`);
                        }}>
                            <td className="room-location"><img src={'/assets/flags/32x32/' + props.sessionStore.getUserLocale + ".png"} /></td>
                            <td className="room-name" id={roomObject.id}>{roomObject.name}</td>
                            <td className="room-users-count">{roomObject.memberCount <= 0 ? 0 : roomObject.memberCount}/8</td>
                            <td className="room-description">{roomObject.description}</td>
                        </tr>
                    </MediaQuery></React.Fragment>);
            });
            
        return <><MediaQuery minWidth={769}>
            <tbody key={uuid.v4()}>{rooms}</tbody></MediaQuery>
            <MediaQuery maxWidth={768}>
            <div key={uuid.v4()}>{rooms}</div></MediaQuery>
        </>; 
    }
}));

export default RoomList;
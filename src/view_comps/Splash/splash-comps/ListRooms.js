import React from 'react';
import { inject, observer } from 'mobx-react';
import { navigate } from 'hookrouter';
import uuid from 'uuid';
import SessionHelpers from '../../local/helpers/session';
import RoomService from '../../../services/room.service';
import serialize from '../../../serialize/serialize';
import MediaQuery from 'react-responsive';
import ScrollText from 'react-scroll-text';

const RoomList = inject('sessionStore', 'roomStore', 'helpers')(observer((props) => {
    
    if (props.sessionStore.getUserLocale !== undefined) { // Wait until we have user location info to render
        let roomPages = props.roomStore.rooms.map((page, idx) => {
        
            let rooms = page.map(room => {
                console.log();
                // Mobile and tablet users have stacked tiles of divs
                // larger sizes have actual tables  
    
                // User count depends on API functions and websockets so for now it is a dummy 
                // For now flags are only displaying the flag of the user viewing the page; later once room API is done, they will show flag of room host origin
            return (<React.Fragment key={uuid.v4()}>
                        <MediaQuery 
                            key={uuid.v4()} 
                            maxWidth={768}
                        >
                        <div 
                            key={uuid.v4()} 
                            className="room-details" 
                            onClick={(e) => {
                                let output = {
                                    room_id: room.id,
                                    user_id: SessionHelpers.getUserID()
                                }
                                RoomService.addUserToRoom(serialize.serialRoomMember(output));
                                props.roomStore.addUserToRoom(serialize.serialRoomMember(output));
                                navigate(`/site/room/${room.id}`);
                            }
                        }>
                            <p 
                                key={uuid.v4()} 
                                className="room-name" 
                                id={room.id}
                            >
                                {room.name}
                            </p>
                            <p 
                                key={uuid.v4()} 
                                className="room-location"
                            >
                                <img 
                                    src={'/assets/flags/32x32/' + props.sessionStore.getUserLocale + ".png"} 
                                />
                            </p>
                            <p 
                                key={uuid.v4()} 
                                className="room-users-count"
                            >
                                {RoomService.getMemberCount(room.members) !== undefined ? RoomService.getMemberCount(room.members) : "0"}/8
                            </p>
                            <ScrollText 
                                className="room-description" 
                                speed={50}
                            >
                                {room.description}
                            </ScrollText>
                        </div>
                        </MediaQuery>
                        <MediaQuery 
                            key={uuid.v4()} 
                            minWidth={769}
                        >
                            <tr 
                                key={uuid.v4()} 
                                className="room-details" 
                                onClick={(e) => {
                                    let output = {
                                        room_id: room.id,
                                        user_id: SessionHelpers.getUserID()
                                    }                                    
                                    RoomService.addUserToRoom(serialize.serialRoomMember(output));
                                    props.roomStore.addUserToRoom(serialize.serialRoomMember(output));
                                    navigate(`/site/room/${room.id}`);
                                }
                            }>
                                <td 
                                    key={uuid.v4()} 
                                    className="room-location"
                                >
                                    <img src={'/assets/flags/32x32/' + props.sessionStore.getUserLocale + ".png"} />
                                </td>
                                <td 
                                    key={uuid.v4()} 
                                    className="room-name" 
                                    id={room.id}
                                >
                                    {room.name}
                                </td>
                                <td 
                                    key={uuid.v4()} 
                                    className="room-users-count"
                                >
                                    {RoomService.getMemberCount(room.members) !== undefined ? RoomService.getMemberCount(room.members) : "0"}/8
                                </td>
                                <td 
                                    key={uuid.v4()} 
                                    className="room-description"
                                >
                                    {room.description}
                                </td>
                            </tr>
                        </MediaQuery>
                    </React.Fragment>);
            });

                return <React.Fragment key={uuid.v4()}>
                    <MediaQuery 
                        key={uuid.v4()} 
                        minWidth={769}
                    >
                        <tbody 
                            key={uuid.v4()} 
                            className={"room-pages " + props.helpers.checkPageDisplay(idx + 1)}
                        >
                            {rooms}
                        </tbody>
                    </MediaQuery>
                    <MediaQuery 
                        key={uuid.v4()} 
                        maxWidth={768}
                    >
                        <div 
                            key={uuid.v4()} 
                            className={"room-pages " + props.helpers.checkPageDisplay(idx + 1)}
                        >
                            {rooms}
                        </div>
                    </MediaQuery>
                </React.Fragment>; 
        });
         
        return roomPages;
    }
}));

export default RoomList;
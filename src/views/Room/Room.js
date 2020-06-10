import React from 'react';
import RoomComp from '../../view_comps/Room/Room';
import Chat from '../../view_comps/Chat/Chat';
import Nav from '../../view_comps/Navigation/Nav';
import { inject, observer } from 'mobx-react';
import LocalSession from '../../view_comps/local/helpers/session';
import Slide from '../../view_comps/Splash/splash-comps/Slide';
import { navigate } from 'hookrouter';
import uuid from 'uuid';

const Room = inject('sessionStore')(observer((props) => {
    let leaveRoom = <button 
                        className="leave-room-button"
                        onClick={(e) => {
                            // Disconnects the user from the service and returns them to the main page under a new user ID
                            LocalSession.unregisterUser();
                            navigate("/", true, {new_user: 'true'});
                        }}
                    >Leave Room</button>
    let closeRoom = <button 
                        className="close-room-button"
                        onClick={(e) => {
                            // Closes this room and returns the host to the main page
                            // Other room users will see an error message and be directed to the main page as well
                            props.sessionStore.closeRoom(props.uuid);
                            navigate("/", true);
                        }}
                    >Close Room</button>

    let userRooms = props.sessionStore.getUserRoomMembership;

    let found = userRooms.find(uuid);

    if (LocalSession.checkUser() === true) {
        return (<>
            <Nav />
            <Slide />
            <div className="room-container">
                <RoomComp />
                <Chat uuid={props.uuid}/>
            </div>
            <div className="room-footer">
                {leaveRoom /* Any user can leave  the room */} 
                {found !== undefined ? closeRoom : "" /* Only host can close it */}
            </div>
        </>
        ); 
    }
    if (LocalSession.checkUser() === false) {
        // Later add a modal before sending the user back to the main page, but for now just navigate
        navigate("/", true);
    }
   
}));

export default Room;
import React, { useEffect } from 'react';
import RoomComp from '../../view_comps/Room/Room';
import Chat from '../../view_comps/Chat/Chat';
import Nav from '../../view_comps/Navigation/Nav';
import { inject, observer } from 'mobx-react';
import config from '../../config';
import RoomService from '../../services/room.service';
import LocalSession from '../../view_comps/local/helpers/session';
import Slide from '../../view_comps/Splash/splash-comps/Slide';
import Message from '../../view_comps/Chat/comps/Message';
import Serializers from '../../serializers/serializers';
import socketIOClient from 'socket.io-client';
import { navigate } from 'hookrouter';
import uuid from 'uuid';
const ENDPOINT = config.SOCKET_URL;

const Room = inject('sessionStore', 'roomStore')(observer((props) => {
    
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("messageSent", message => { // Capture instruction from Socket.io
            socket.emit("getRoomMessages", message.room_id);
        });
    }, []);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("receiveMessages", messages => { // Capture instruction from Socket.io
            props.roomStore.setRoomMessages(messages, props.uuid);
        });
    }, []);

    let leaveRoom = <button 
                        className="leave-room-button"
                        onClick={(e) => {
                            // Disconnects the user from the service and returns them to the main page under a new user ID
                            RoomService.removeUserFromRoom(Serializers.member(props.uuid, LocalSession.getUserID()));
                            navigate("/", true);
                        }}
                    >Leave Room</button>
    let closeRoom = <button 
                        className="close-room-button"
                        onClick={(e) => {
                            // Closes this room and returns the host to the main page
                            // Other room users will see an error message and be directed to the main page as well
                            RoomService.deleteRoom(props.uuid);
                            navigate("/", true);
                        }}
                    >Close Room</button>

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
                {closeRoom}
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
import React from 'react';
import config from '../../config';
import { inject, observer } from 'mobx-react';
import Message from './comps/Message';
import moment from 'moment';
import uuid from 'uuid';
import SessionHelpers from '../local/helpers/session';
import socketIOClient from 'socket.io-client';
const ENDPOINT = config.SOCKET_URL;

function TestThings(id, message) {
    const socket = socketIOClient(ENDPOINT);
    socket.emit("newMessage", { message: message, id: id });
}

const Chat = inject('sessionStore')(observer((props) => {
    let room = props.sessionStore.getChatRoom(props.uuid);
    let currentRoom, messageMap;
    if (room === undefined) {
        props.sessionStore.setRoom(props.uuid);
    }
    if (room !== undefined) {
        currentRoom = props.sessionStore.getChatRoom(props.uuid);
        messageMap = currentRoom.messages.map(messageObj => {
            return <Message message={messageObj.message} name={messageObj.name}/>
        });
    }


    return (
        <div className="chat-window">
            <ul className="messages">
                {messageMap}
            </ul>
                <form className="message-form">
                <input type="text" className="message-send" autoComplete="off" value={props.sessionStore.getUserSendMessage} onChange={(e) => {
                    props.sessionStore.setUserSendMessage(e.target.value);
                }}/><button 
                    className="send-message-button"
                    onClick={(e) => {
                        e.preventDefault();
                        // Call the function to send a message here for now just add to local store
                        let messageObject = {
                            id: uuid.v4(),
                            user_name: SessionHelpers.getUserName(),
                            time_stamp: moment(new Date),
                            message: props.sessionStore.userSendMessage
                        }
                        TestThings(props.uuid, messageObject);
                        props.sessionStore.setRoomMessage(props.uuid, props.sessionStore.getUserSendMessage);
                        props.sessionStore.setUserSendMessage(""); // Reset message blank for next message
                    }}>Send</button>
            </form>
        </div>
    );
}));

export default Chat;
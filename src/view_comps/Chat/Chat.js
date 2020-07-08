import React from 'react';
import { inject, observer } from 'mobx-react';
import Message from './comps/Message';
import RoomService from '../../services/room.service';
import Serializers from '../../serializers/serializers';
import LocalSession from '../local/helpers/session';

const Chat = inject('sessionStore', 'roomStore')(observer((props) => {
    let messages = props.roomStore.getMessages;
    let roomMessages = messages.find(messageObject => {
        if (messageObject.room_id === props.uuid) {
            return messageObject;
        }
    });
    let roomObjects;
    if (roomMessages !== undefined) {
        roomObjects = roomMessages.messages.map(message => {
        return <Message message={message.message} user_name={message.user_name} />
        });
    }
    return (
        <div className="chat-window">
            <ul className="messages">
                {roomObjects !== null ? roomObjects : ""}
            </ul>
                <form className="message-form">
                <input type="text" className="message-send" autoComplete="off" value={props.sessionStore.getUserSendMessage} onChange={(e) => {
                    props.sessionStore.setUserSendMessage(e.target.value);
                }}/><button 
                    className="send-message-button"
                    onClick={(e) => {
                        e.preventDefault();
                        RoomService.sendMessage(Serializers.message(LocalSession.getUserName(), props.sessionStore.getUserSendMessage, props.uuid));
                        props.sessionStore.setUserSendMessage("");
                    }}>Send</button>
            </form>
        </div>
    );
}));

export default Chat;
import React from 'react';
import { inject, observer } from 'mobx-react';
import Message from './comps/Message';
import RoomService from '../../services/room.service';
import Serializers from '../../serializers/serializers';
import LocalSession from '../local/helpers/session';
import uuid from 'uuid';

const Chat = inject('sessionStore', 'roomStore')(observer((props) => {
    let messages = props.roomStore.getMessages;
    let roomMessages = messages.find(messageObject => {
        if (messageObject.room_id === props.uuid) {
            return messageObject;
        }
        return null;
    });
    let roomObjects;
    if (roomMessages !== undefined) {
        roomObjects = roomMessages.messages.map(message => {
        return <Message key={uuid.v4()} message={message.message} user_name={message.user_name} />
        });
    }
    return (
        <div className="chat-window">
            <div className="messages">
                {roomObjects !== null ? roomObjects : ""}
                <div id="anchor"></div>
            </div>
                <form className="message-form">
                <input type="text" className="message-send" autoComplete="off" value={props.sessionStore.getUserSendMessage} onChange={(e) => {
                    props.sessionStore.setUserSendMessage(e.target.value);
                }}/><button 
                    className="send-message-button"
                    onClick={(e) => {
                        e.preventDefault();
                        let message = props.sessionStore.getUserSendMessage;
                        let hasURL = null;
                        let regEx = /(?:youtube\.com\/(?:[^]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\s]{11})/gi;
                        hasURL = message.match(regEx);
                        if (hasURL !== undefined && hasURL !== null) {
                            RoomService.sendPlaylistEntry(Serializers.playlistEntryOut(props.uuid, hasURL));
                        }
                        RoomService.sendMessage(Serializers.message(LocalSession.getUserName(), props.sessionStore.getUserSendMessage, props.uuid));
                        let messages = document.querySelector('.messages');
                        messages.scrollTop = messages.scrollHeight;
                        props.sessionStore.setUserSendMessage("");
                    }}>Send</button>
            </form>
        </div>
    );
}));

export default Chat;
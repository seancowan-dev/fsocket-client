import React from 'react';
import { inject, observer } from 'mobx-react';
import Message from './comps/Message';

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
                        props.sessionStore.setRoomMessage(props.uuid, props.sessionStore.getUserSendMessage);
                        props.sessionStore.setUserSendMessage(""); // Reset message blank for next message
                    }}>Send</button>
            </form>
        </div>
    );
}));

export default Chat;
import React from 'react';
import { inject, observer } from 'mobx-react';
import RoomService from '../../services/room.service'
import Serializers from '../../serializers/serializers';
import LocalSession from '../local/helpers/session';

const Modal = inject('sessionStore')(observer((props) => {
    const displayStyle = {
        display: props.sessionStore.getModalDisplay
    }
    return (
        <div style={displayStyle} className="modal">
            <form className="modal-form">
                <input 
                    className="modal-inputs create-room-title" 
                    type="text" 
                    placeholder="room title (required)" 
                    value={props.sessionStore.getNewRoomName} 
                    onChange={(e) => {
                        props.sessionStore.setNewRoomName(e.target.value); // Set the room name
                    }}
                />
                <input 
                    className="modal-inputs create-room-description" 
                    type="text" 
                    placeholder="description (required)" 
                    value={props.sessionStore.getNewRoomDescription}
                    onChange={(e) => {
                        props.sessionStore.setNewRoomDescription(e.target.value); // Set the room description
                    }}
                />
                <button className="create-new-room modal-create" onClick={(e) => {
                    e.preventDefault();
                    RoomService.createNewRoom(Serializers.roomOut(props.sessionStore.getNewRoomName, LocalSession.getUserName(), props.sessionStore.getNewRoomDescription));
                    props.sessionStore.setModalDisplay("none");
                }}>Create Room</button>
            </form> 
        </div>
    );
}));

export default Modal;
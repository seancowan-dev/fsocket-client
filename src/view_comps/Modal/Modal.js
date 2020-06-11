import React from 'react';
import { inject, observer } from 'mobx-react';
import roomStore from '../../stores/room.store';
import LocalHelpers from '../../view_comps/local/helpers/helpers';
import SessionHelpers from '../../view_comps/local/helpers/session';

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
                        props.sessionStore.setNewRoomName(e.target.value);
                    }}
                />
                <input 
                    className="modal-inputs create-room-description" 
                    type="text" 
                    placeholder="description (required)" 
                    value={props.sessionStore.getNewRoomDescription}
                    onChange={(e) => {
                        props.sessionStore.setNewRoomDescription(e.target.value);
                    }}
                />
                <input 
                    className="modal-inputs create-room-password" 
                    type="text" 
                    placeholder="password (optional)" 
                    value={props.sessionStore.getNewRoomPassword}
                    onChange={(e) => {
                        props.sessionStore.setNewRoomPassword(e.target.value);
                    }}
                />
                <button className="create-new-room modal-create" onClick={(e) => {
                    e.preventDefault();
                    let userRooms = SessionHelpers.getUserRooms();
                    console.log(userRooms);
                    if (userRooms.length <= 4) {
                        LocalHelpers.listRoom(LocalHelpers.createRoom());
                    }
                    if (userRooms.length > 4) {
                        alert('This temporary alert is here because users may only host 5 rooms');
                    }
                    
                    props.sessionStore.setModalDisplay("none");
                }}>Create Room</button>
            </form> 
        </div>
    );
}));

export default Modal;
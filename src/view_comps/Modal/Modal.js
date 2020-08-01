import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import RoomService from '../../services/room.service'
import Serializers from '../../serializers/serializers';
import LocalSession from '../local/helpers/session';
import uuid from 'uuid';

const Modal = inject('sessionStore')(observer((props) => {
    const displayStyle = { // Get the state of the modal display
        display: props.sessionStore.getModalDisplay
    }
    const displayMessage = { // Get the state of the modal message display
        display: props.sessionStore.getModalMessageDisplay
    }

    let [modalMessages, setModalMessages] = useState();
    return (
        <div style={displayStyle} className="modal" onClick={(e) => {
            if (e.target.classList[0] === "modal") {
                props.sessionStore.setModalDisplay("none");
                window.scrollTo(props.sessionStore.getLastUserScroll[0], props.sessionStore.getLastUserScroll[1]);
            }
        }}>
            <form className="modal-form">
                <div style={displayMessage}className="modal-form-message">
                    {modalMessages}
                </div>
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
                <button className="create-new-room modal-create standard-button" onClick={(e) => {
                    e.preventDefault();
                    let data = { // Get the user input from the session store
                        name: props.sessionStore.getNewRoomName,
                        description: props.sessionStore.getNewRoomDescription
                    }
                    let flags = 0; // Set flags to 0
                    let errors = []; // Prepare error array
                    let regEx = /^(?=.*[a-zA-Z0-9 ]).{5,}/;
                    let matchName = data.name.match(regEx);
                    let matchDescription = data.description.match(regEx);

                    if (data.name.length <= 0 || matchName === null) { // If there is no data for the room name
                        flags++; // Add a flag
                        errors.push("You need to enter a room name that contains characters and is at least 5 characters long."); // Add an appropriate message
                    }
                    if (data.name.length > 16) { // Keep room names short and simple
                        flags++; // Add a flag
                        errors.push("Room name cannot be more than 16 characters long"); // Add an appropriate message
                    }
                    if (data.description.length <= 0 || matchDescription === null) { // If there is no data for the room description
                        flags++; // Add a flag
                        errors.push("You need to enter a room description that contains characters and is at least 5 characters long."); // Add an appropriate message
                    }
                    if (data.description.length > 128) { // Description too long
                        flags++; // Add a flag
                        errors.push("Room description may only be 128 characters long"); // Add an appropriate message
                    }
                    if (flags > 0) { // If flags were seen
                        props.sessionStore.setModalMessageDisplay("block"); // Show the error modal
                        setModalMessages(errors.map(error => {
                            return <p key={uuid.v4()}>{error}</p>
                        }))
                        setTimeout(() => { // After some time, hide the error message
                            props.sessionStore.setModalMessageDisplay("none");
                        }, 5000)
                    } else {
                        RoomService.createNewRoom(Serializers.roomOut(data.name, LocalSession.getUserName(), data.description));
                        props.sessionStore.setModalDisplay("none");
                    }

                }}>Create Room</button>
            </form> 
        </div>
    );
}));

export default Modal;
import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import RoomService from '../../../services/room.service';
import socketIOClient from 'socket.io-client';
import config from '../../../config';

const ENDPOINT = config.SOCKET_URL;
const NewHostModal = inject('uxcStore', 'roomStore')(observer((props) => {

    let modalDisplay = "";

    if (props.uxcStore.getSelectHostModalState === false) { // If the modal display is false change the class to hide it
        modalDisplay = "hide-host-modal";
    }
    if (props.uxcStore.getSelectHostModalState === true) { // If the modal display is true change the class to show it
        modalDisplay = "show-host-modal";
    }

    let listItems;
    let roomMembers = props.roomStore.getRoomMembers(props.room_id); // Get the room members from the store

    // Set this once when the modal opens
    let owner = props.roomStore.getRoomOwner(props.room_id);

    // Set it again if the owner changes
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("roomOwnerUpdated", data => {
            props.roomStore.changeRoomOwner(props.room_id, data); // Change the room owner in the local store
        });
    }, [props.roomStore, props.room_id]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("userAddedToRoom", data => {
            props.roomStore.userAddedToRoom(data); // Add the user to the local store
        })
    }, [props.roomStore])

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("removedUserFromRoom", data => {
            props.roomStore.removeUserFromRoom(data); // Remove the user from the local store
        })
    }, [props.roomStore])


    if (roomMembers) { // If there are members map them
        listItems = roomMembers.map(member => {
            let ownerClass = "";
            if (member) { // wait for data to actually exist
                if (owner.owner === member.name) { // If the owner of the room is the same as this member
                    ownerClass = "host-modal-current-host"; // Assign a class to highlight current room owner
                }
            }

            return <div 
                        className={"host-modal-member-list-item " + ownerClass} 
                        key={member.user_id} 
                        onClick={(e) => {
                            let newRoomOwner = owner;
                            newRoomOwner.owner = member.name;
                            RoomService.updateRoomOwner(newRoomOwner); // Call the room service to emit to the socket
                        }}
                    >
                        {member.name}
                    </div>
        });
    }

    return (
        <div className={modalDisplay + " new-host-modal"}>
            <div className="host-member-list-container">
                <div className="host-modal-member-list">
                    <h3>Select a new room host</h3> <br />
                    {listItems}
                </div>
            </div>
            <div className="selectNewHostFooter">
                <button className="close-new-host-modal standard-button" onClick={(e) => {
                        e.preventDefault();
                        props.uxcStore.openHostModal(props.uxcStore.getSelectHostModalState); // Toggle the host modal closed
                }}>Close</button>

            </div>
        </div>
    );
}));

export default NewHostModal;
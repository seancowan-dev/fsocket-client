import React from 'react';
import roomStore from '../../../stores/room.store';
import sessionStore from '../../../stores/session.store';
import SessionHelpers from './session';
import uuid from 'uuid';

class LocalHelpers {

    createRoom() { // Creates a room JSON object to either store locally or in session data, psql db, etc.
        let host = SessionHelpers.getUserID();
        return {
            id: uuid.v4(),
            roomHost: host.substring(1, host.length - 1),
            name: sessionStore.modal.newRoomName,
            desc: sessionStore.modal.newRoomDescription,
            password: sessionStore.modal.newRoomPassword
        }
    }

    registerRoom() { // Place holder to wire up to API later

    }
    endRoom(room_id) { // Closes/Ends the room
        let rooms = roomStore.rooms.slice();

        let roomData = rooms.forEach(room => {
            room.find(roomInfo => {
                return roomInfo.id === room_id;
            })
        })
    }
    leaveRoom() { // Exits a user from a room

    }


}

export default new LocalHelpers();
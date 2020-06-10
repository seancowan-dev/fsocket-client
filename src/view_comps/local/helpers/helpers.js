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
    listRoom(roomJSON) { // Enters the room into the front-end store to avoid repeated fetch calls
        const checkLastArrayElem  = (json) => {
            let last = roomStore.getLastArrayLength;
            let { id, name, desc } = json;
            let requiredElems = {
                "id": id,
                "name": name,
                "desc": desc
            }
            let errors = [];
            // Implement full validation later, for now just make sure some data was entered
            for (let [key, val] of Object.entries(requiredElems)) {
                if (val === "" || val === undefined || val === null) {
                    errors.push({error: `The property: ${key} had an empty value of type: ${typeof(val)}`});
                }
            };
            
            // Only run if there is are no errors
            if (errors.length === 0 && roomJSON.password === "") { // Do this if no password is entered
                if (last === 20) { // If the length of the last array element is 20
                    // should insert into a new array elem/page   
                    roomStore.setRoomInNew(json);
                }
                if (last < 20) { // Otherwise if the length is less than 20
                    // should insert into the existing element
                    roomStore.setRoomInCurrent(json);
                } 
            }
            if (errors.length === 0 && roomJSON.password !== "") { // Do this if a password is entered
                alert("You entered a password for the room.  This requires the API to be built to function, so you are seeing this message instead :)");
            }
            if (errors.length > 0) {
                errors.forEach(errorObj => {
                    console.error(errorObj.error);
                })
            }

        }
        checkLastArrayElem(roomJSON);
        this.joinRoom(roomJSON.id);
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
    joinRoom(room_id) { // Joins a user to the room
        sessionStore.setAddUserRoom(room_id);
    }
    leaveRoom() { // Exits a user from a room

    }

}

export default new LocalHelpers();
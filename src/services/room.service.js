import React from 'react';
import config from '../config';
import socketIOClient from 'socket.io-client';
import RoomStore from '../stores/room.store';
import serializers from '../serializers/serializers'
const ENDPOINT = config.SOCKET_URL;
const socket = socketIOClient(ENDPOINT);

const ServiceHelpers = {
    calculateMembers(grouped, currentRoom) {
        let keys = Object.keys(grouped);
        return keys.find(key => {
            if (key === currentRoom.id) {
                return key;
            }
            else {
                return false;
            }
        })
    }
}

const RoomService = {

    // Send Data to Socket
    createNewRoom(serialized) { // Send room data to the websocket
        socket.emit('createRoom', serialized);
    },
    deleteRoom(id) {
        socket.emit('deleteRoom', id);
    },
    getAllRooms() { // Get a list of all rooms
        socket.emit('getAllRooms');
    },
    addUserToRoom(serial) {
        socket.emit('addUserToRoom', serial);
        socket.emit("getRoomMessages", serial.room_id);
    },
    removeUserFromRoom(serial) {
        socket.emit('removeUserFromRoom', serial);
    },
    sendMessage(serialized) { // Send a message to the websocket
        socket.emit('sendMessage', serialized);
    }

}

export default RoomService;
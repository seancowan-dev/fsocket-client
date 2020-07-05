import React from 'react';
import config from '../config';
import socketIOClient from 'socket.io-client';
import RoomStore from '../stores/room.store';
const ENDPOINT = config.SOCKET_URL;
const socket = socketIOClient(ENDPOINT);

const RoomService = {

    // Send Data to Socket
    createNewRoom(serialized) { // Send room data to the websocket
        socket.emit('createRoom', serialized);
    },
    getAllRooms() { // Get a list of all rooms
        socket.emit('getAllRooms');
    },
    addUserToRoom(serial) {
        socket.emit('addUserToRoom', serial);
    },
    sendMessage(serialized) { // Send a message to the websocket
        socket.emit('sendMessage', serialized);
    },
    // Process data from socket
    processRooms(rooms) {
        const groupBy = key => array =>
        array.reduce((objectsByKeyValue, obj) => {
            const value = obj[key];
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});
        const grouped = groupBy("id")
        console.log(grouped(rooms.rows))
        let unique = [...new Set(rooms.rows)];
        console.log(unique);
        let currentRooms = RoomStore.getRooms; // Get all the rooms currently inside the client
        
        rooms.rows.forEach(inRoom => { // For each of the incoming rooms
            let existing; // Placeholder
            currentRooms.forEach(roomPage => { // For each page of current rooms
                existing = roomPage.find(room => { // Check each room in the page
                    return room.id === inRoom.id; // If the existing id matches the incoming id
                })
            });
            if (existing === undefined) { // If existing is null no room with this id exists
                RoomStore.listRoom(inRoom); // List the new room
            }
        })
    },
    insertUserInRoom(serialUser) {
        let currentRooms = RoomStore.getRooms; // Get all the rooms currently inside the client
        let existing; // Placeholder
        currentRooms.forEach(roomPage => { // For each page of current rooms
            roomPage.forEach(room => { // Check each room in the page
                if (room.id === serialUser.room_id) { // If the room id in the store matches the room of id of the user object
                    room.members.push(serialUser); // Push the user into the room
                }
            })
        });
    }

}

export default RoomService;
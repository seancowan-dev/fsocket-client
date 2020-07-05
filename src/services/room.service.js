import React from 'react';
import config from '../config';
import socketIOClient from 'socket.io-client';
import RoomStore from '../stores/room.store';
import serialize from '../serialize/serialize';
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
        const groupBy = key => array => // Group unsorted objects from the database grouped on some specified key
            array.reduce((objectsByKeyValue, obj) => {
                const value = obj[key];
                objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
                return objectsByKeyValue;
        }, {});
        const grouped = groupBy("id") // Group by the id key (room id)

        let roomMembers = grouped(rooms.rows); // Group the room rows from the database
        let unique = [...new Set(rooms.rows)]; // Create unique sets to remove duplicates (rooms list comes from this array)
        let currentRooms = RoomStore.getRooms; // Get all the rooms currently inside the client

        rooms.rows.forEach(inRoom => { // For each of the incoming rooms
            let existing; // Placeholder
            currentRooms.forEach(roomPage => { // For each page of current rooms
                existing = roomPage.find(room => { // Check each room in the page
                    return room.id === inRoom.id; // If the existing id matches the incoming id
                })
            });
            if (existing === undefined) { // If existing is null no room with this id exists
                inRoom.members = [];
                let key = ServiceHelpers.calculateMembers(roomMembers, inRoom);
                if (key !== false) {
                    let members = roomMembers[key].map(member => {
                        console.log(serialize.serialRoomMember(member));
                        return serialize.serialRoomMember(member);
                    });
                    inRoom.members = members;
                }
                RoomStore.listRoom(inRoom); // List the new room
            }
        })
    },
    insertUserInRoom(serialUser) {
        console.log("i am used somewhere");
        let currentRooms = RoomStore.getRooms; // Get all the rooms currently inside the client
        let existing; // Placeholder
        currentRooms.forEach(roomPage => { // For each page of current rooms
            roomPage.forEach(room => { // Check each room in the page
                if (room.id === serialUser.room_id) { // If the room id in the store matches the room of id of the user object
                    room.members.push(serialUser); // Push the user into the room
                }
            })
        });
    },
    // Helper methods
    getMemberCount(membersObject) {
        if (membersObject !== undefined && membersObject.length !== 0) {
            let members = membersObject.map(member => {
                return member;
            })
            if (members[0].user_id !== null) { // If the first member has an id then the room has members
                return members.length;
            }
            if (members[0].user_id !== null) { // If the first member has a null id then the room is empty
                return undefined;
            }
        }
        if (membersObject === undefined) {
            return undefined;
        }

    }

}

export default RoomService;
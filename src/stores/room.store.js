import React from 'react';
import { observable, action, computed } from 'mobx';

class RoomStore {
    @observable rooms = [];

    @observable roomMessages = [];

    findRoom(room_id) {
        let roomIdx;
        let found = this.roomMessages.find((roomObject, idx) => { // Search the current room messages object for a room
            if (roomObject.room_id === room_id) { // If the room is found return the index and the roomObject
                roomIdx = idx;
                return roomObject;
            }
        })
        return {
            found: found,
            roomIdx: roomIdx
        };
    }

    @action setRoomMessages = (messages, room_id) => { // Accept an array of messages from the DB and a room_id to append to
        let { found, roomIdx } = this.findRoom(room_id); // Find a room and index if they exist
        
        if (found !== undefined) { // If there is object for this rooms messages, then overwrite it with the new one
            this.roomMessages[roomIdx] = {
                room_id: room_id,
                messages: messages
            }
        }
        if (found === undefined) {  // If there is no object for this rooms messages, then create one
            this.roomMessages.push({
                room_id: room_id,
                messages: messages
            });
        }
    }

    @action setRoomMessage = (message, room_id) => { // Accept a single new message and a room_id to append to
        let { found, roomIdx } = this.findRoom(room_id); // Find a room and index if they exist

        if (found !== undefined) { // If a room object already exists then push the message into the existing message array
            this.roomMessages[roomIdx].messages.push(message);
        }
        if (found === undefined) {  // If there is no room object in place then create one and push it with the new message in a new array
            let inputArray = [];
            inputArray.push(message);
            this.roomMessages.push({
                room_id: room_id,
                messages: inputArray
            });
        }
    }

    @computed get getMessages() {
        return this.roomMessages;
    }

    @action addRoom = (incomingRoom) => {
        let found = this.rooms.find(room => {
            if (room.id === incomingRoom.id) {
                return room;
            }
        });
        if (!found) {
            this.rooms.push(incomingRoom);
        }
    }

    @action deleteRoom = (id) => {
        let roomIdx;
        let found = this.rooms.find((room, idx) => {
            if (room.id === id) {
                roomIdx = idx;
                return room; 
            }
        });
        if (found) {
            this.rooms.splice(roomIdx, 1);
        }
    }

    @action userAddedToRoom = (member) => {
        let roomIdx;
        let found = this.rooms.find((room, idx) => {
            console.log(room.id);
            if (room.id === member.room_id) {
                roomIdx = idx;
                return room;
            }
        });
        if (found) {
            this.rooms[roomIdx].memberCount++;
            this.rooms[roomIdx].members.push(member);
        }
    }

    @action removeUserFromRoom = (member) => {
        let roomIdx;
        let userIdx;
        let foundUser;
        let found = this.rooms.find((room, idx) => {
            if (room.id === member.room_id) {
                roomIdx = idx;
                return room;
            }
        });
        if (found) {
            foundUser = this.rooms[roomIdx].members.find((current, idx) => {
                if (current.room_id === member.room_id) {
                    userIdx = idx;
                    return current;
                }
            })
            if (foundUser) {
                this.rooms[roomIdx].memberCount--;
                let newUserList = this.rooms[roomIdx].members.splice(userIdx, 1);
                this.rooms[roomIdx].members = newUserList;
            }
        }
    }

    @action prepRoomMembers = (array) => {
        let membersList = array.map(row => {
            if (row.user_id !== undefined && row.user_id !== null) {
                return {
                    room_id: row.room_id,
                    user_id: row.user_id
                }
            }
        })
        return membersList;
    }

    @action groupRooms = (rooms) => {
        const groupBy = key => array => // Group unsorted objects from the database grouped on some specified key
        array.reduce((objectsByKeyValue, obj) => {
            const value = obj[key];
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});
        const grouped = groupBy("id") // Group by the id key (room id)

        return grouped(rooms); // Group the room rows from the database
    }

    @action processRoomRows = (rows) => {
        let roomGroups = this.groupRooms(rows);

        for (const [key, value] of Object.entries(roomGroups)) {
            let room = {
                id: key,
                name: value[0].name,
                description: value[0].description,
                password: value[0].password,
                memberCount: 0,
                members: []
            }
            let members = this.prepRoomMembers(value);
            if (members[0] !== undefined) {
                room.memberCount = this.prepRoomMembers(value).length;
                room.members = this.prepRoomMembers(value);
            }
            this.addRoom(room);
        }
    }

    @computed get getRooms() {
        return this.rooms;
    }
}

export default new RoomStore();
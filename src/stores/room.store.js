import { observable, action, computed } from 'mobx';

class RoomStore {
    @observable rooms = [];

    @observable roomMessages = [];

    _findRoom(room_id) { // This function finds a room only if it has messages in it, used for getting room messages
        let roomIdx;
        let found = this.roomMessages.find((roomObject, idx) => { // Search the current room messages object for a room
            if (roomObject.room_id === room_id) { // If the room is found return the index and the roomObject
                roomIdx = idx;
                return roomObject;
            }
            return null
        })
        return {
            found: found,
            roomIdx: roomIdx
        };
    }

    // This refreshes room messages from the DB through the socket
    @action setRoomMessages = (messages, room_id) => { // Accept an array of messages from the DB and a room_id to append to
        let { found, roomIdx } = this._findRoom(room_id); // Find a room and index if they exist and have messages
        
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

    // This sets a single new room message in an open room
    @action setRoomMessage = (message, room_id) => { // Accept a single new message and a room_id to append to
        let { found, roomIdx } = this._findRoom(room_id); // Find a room and index if they exist

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

    // This returns a shallow copy of the current messages in the client
    @computed get getMessages() {
        return this.roomMessages;
    }

    // This adds a new room to the client
    @action addRoom = (incomingRoom) => { // Pass a complete room JSON
        let found = this.rooms.find(room => { // Map the rooms that are already stored on the client
            if (room.id === incomingRoom.id) { // If the incoming room already exists
                return room; // Return that room
            }
            return null
        });
        if (!found) { // If found has a room, then do nothing
            this.rooms.push(incomingRoom); // Otherwise this room has not already been stored in the client, so push it to the array.
        }
    }

    // This removes a room from the client
    @action deleteRoom = (id) => {
        let roomIdx;
        let found = this.rooms.find((room, idx) => {
            if (room.id === id) {
                roomIdx = idx;
                return room; 
            }
            return null
        });
        if (found) {
            this.rooms.splice(roomIdx, 1);
        }
    }

    // This handles a new user joining a room
    @action userAddedToRoom = (members) => {
        let roomIdx;
        let found = this.rooms.find((room, idx) => {
            if (members) {
                if (room.id === members[0].room_id) {
                    roomIdx = idx;
                    return room;
                }
            }
            return null
        });
        if (found) {
            this.rooms[roomIdx].members = members;
        }
    }

    // This handles a user leaving a room
    @action removeUserFromRoom = (member) => {
        let roomIdx;
        let userIdx;
        let foundUser;
        let found = this.rooms.find((room, idx) => {
            if (room.id === member.room_id) {
                roomIdx = idx;
                return room;
            } 
            return null
        });
        if (found) {
            foundUser = this.rooms[roomIdx].members.find((current, idx) => {
                if (current.user_id === member.user_id) {
                    userIdx = idx;
                    return current;
                }
                return null
            })
            if (foundUser) {
                this.rooms[roomIdx].members.splice(userIdx, 1);
            }
        }
    }

    // This scans the input room rows for room members and collates them
    @action prepRoomMembers = (array) => { // Pass the array of room rows
        let membersList = array.map(row => { // Map the room rows
            if (row.user_id !== undefined && row.user_id !== null) { // If a row has a user_id then that row is an entry from room_members in the DB
                return {    // Since something was found return the room_id and user_id
                    room_id: row.room_id,
                    user_id: row.user_id,
                    name: row.member_name
                }
            }
            return null
        })
        return membersList; // Return all the mapped rows
    }

    // This groups the raw rooms data from the DB by ID
    @action groupRooms = (rooms) => { // Pass all the rows received from the DB socket
        const groupBy = key => array => // Group unsorted objects from the database grouped on some specified key

        // Note about what this reducer is doing.  The way the data is stored in the DB, there can only ever be 1 entry for the room itself
        // but there can be multiple entries for room members, as such if there is only one row returned from the DB then that room has no members currently inside of it
        // As such if the reducer is able to group anything beyond a single entry, then all subsequently grouped elements after the first entry must therefore be room members

        array.reduce((objectsByKeyValue, obj) => { // Perform a reduce on all the rows
            const value = obj[key]; // Find the key that is specified
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj); // If the current row contains the same key that is already in the accumulator then concat this row with the existing rows
            return objectsByKeyValue; // Return the concatenated object values
        }, {});

        const grouped = groupBy("id") // Group by the id key (room id)

        return grouped(rooms); // Group the room rows from the database
    }

    // This takes the grouped rooms and processes their rows into room data and member data
    @action processRoomRows = (rows) => { // Pass all the rows received from the DB socket
        let roomGroups = this.groupRooms(rows); // Perform a group on all these entries

        for (const [key, value] of Object.entries(roomGroups)) { // For each group of room rows
            let room = { // Find the information about the room itself
                id: key,
                name: value[0].name,
                owner: value[0].owner,
                description: value[0].description,
                memberCount: 0,
                members: [],
                playlist: [],
                playlistObjects: []
            }

            let members = this.prepRoomMembers(value); // Prep the room members

            if (members[0] !== undefined) { // If prepRoomMembers returned something then there are members to add
                room.memberCount = this.prepRoomMembers(value).length; // Increase the room member count based on the number shown in the DB
                room.members = this.prepRoomMembers(value); // Add the room_members to the members property of the room JSON
            }

            this.addRoom(room); // Add the room into the local store
        }
    }

    // This returns a shallow copy of all rooms currently in the client
    @computed get getRooms() {
        return this.rooms;
    }

    // This returns a list of all members currently in the client for a specified room [by id]
    @action getRoomMembers = (room_id) => { // Accept a room ID to look for
        let foundMembers = this.rooms.find(roomObj => { // Find the room object matching this ID
            if (roomObj.id === room_id) {
                return roomObj.members;
            }
            return null
        });
        if (foundMembers !== null) { // If we found something return the members
            return foundMembers.members.slice();
        }
        else { // Otherwise return false so the client knows there are no members in the room
            return false;
        }
    }

    // This returns the current room owner
    @action getRoomOwner = (room_id) => {
        let foundOwner = this.rooms.find(roomObj => {
            if (roomObj.id === room_id) {
                return roomObj.owner;
            }
            return null
        })
        if (foundOwner) { // If an owner was found return it
            return foundOwner;
        }
        else { // Otherwise return false so the client knows there are no members in the room
            return false;
        }
    }

    @action changeRoomOwner = (room_id, owner) => {
        let roomIdx = null;
        this.rooms.find((roomObj, idx) => { // Try to find the room
            if (roomObj.id === room_id) { // If it was found return its idx in the array
                roomIdx = idx;
            }
            return null
        });
        if (roomIdx !== null) { // If the idx was found set the owner of this room to the new owner
            this.rooms[roomIdx].owner = owner;
        }
    }

    // Controls updating the room playlist
    @action updateRoomPlaylist = (room_id, new_playlist) => { // These are raw entries of data
        let roomIdx = null;
        let room = this.rooms.find((roomObj, idx) => { // Check to see if the room exists
            if (roomObj.id === room_id) {
                roomIdx = idx; // If it does store its index
                return roomObj;
            }

        });

        if (room) {
            this.rooms[roomIdx].playlist = new_playlist; // Overwrite the old playlist with the new one from the server
        }
        return new_playlist; // Return the new playlist to update on client
    }
}

export default new RoomStore();
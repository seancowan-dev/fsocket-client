import config from '../config';
import socketIOClient from 'socket.io-client';
const ENDPOINT = config.SOCKET_URL;
const socket = socketIOClient(ENDPOINT);

const RoomService = {

    // Send Data to Socket
    createNewRoom(serialized) { // Tell the websocket that a new room was created
        socket.emit('createRoom', serialized);
    },
    updateRoomOwner(serialized) { // Tell the websocket that a room owner has changed
        socket.emit('updateRoomOwner', serialized);
    },
    deleteRoom(id) { // Tell the web socket to delete a room
        socket.emit('deleteRoom', id);
    },
    getAllRooms() { // Get a list of all rooms
        socket.emit('getAllRooms');
    },
    addUserToRoom(serialized) { // When a new user joins a room tell the websocket to add that user, and to send the chat messages to their client
        socket.emit('addUserToRoom', serialized);
        socket.emit('getRoomMessages', serialized.room_id);
    },
    removeUserFromRoom(serialized) { // Tell the websocket to remove a user from the room
        socket.emit('removeUserFromRoom', serialized);
    },
    sendMessage(serialized) { // Send a message to the websocket
        socket.emit('sendMessage', serialized);
    },
    sendPlaylistEntry(serialized) { // Tell the websocket that someone added a video URL to the playlist
        socket.emit('addToPlaylist', serialized);
    }
}

export default RoomService;
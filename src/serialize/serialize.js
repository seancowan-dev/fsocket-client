const Serializer = {
    serialRoomMember: (member) => {
        return {
            room_id: member.room_id,
            user_id: member.user_id
        }
    },
    serialRoomOut: (name, owner, description, password) => { // Room ID and date created on server, not needed for output
        return {
            name: name,
            owner: owner,
            description: description,
            password: password !== "" ? password : null
        }
    },
    serialMessageOut: (user_name, message_text, room_id) => {
        return {
            user_name: user_name,
            message_text: message_text,
            room_id: room_id
        }
    }
}

export default Serializer;
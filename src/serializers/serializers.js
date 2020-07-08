const Serializer = {
    member: (room_id, user_id) => {
        return {
            room_id: room_id,
            user_id: user_id
        }
    },
    roomOut: (name, owner, description, password) => { // Room ID and date created on server, not needed for output
        return {
            name: name,
            owner: owner,
            description: description,
            password: password !== "" ? password : null
        }
    },
    room: (id, name, owner, description, password, memberCount = "0", members = []) => { // Room ID and date created on server, not needed for output
        return {
            id: id,
            name: name,
            owner: owner,
            description: description,
            password: password !== "" ? password : null,
            memberCount: memberCount,
            members: members
        }
    },
    message: (user_name, message, room_id) => {
        return {
            user_name: user_name,
            message: message,
            room_id: room_id
        }
    },
    messageIn: (id, user_name, date_added, message, room_id) => {
        return {
            id: id,
            user_name: user_name,
            date_added: date_added,
            message: message,
            room_id: room_id
        }
    }
}

export default Serializer;
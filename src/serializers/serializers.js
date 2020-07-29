const Serializer = {
    member: (room_id, user_id, name) => {
        if (user_id.length > 36) { // If the UUID is larger than 36 chars long then it has leading and trailing commas from JSOJ
                                    // remove them
            user_id = user_id.slice(1, user_id.length - 1);
        }
        return {
            room_id: room_id,
            user_id: user_id,
            name: name
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
    room: (id, name, owner, description, memberCount = "0", members = []) => { // Room ID and date created on server, not needed for output
        return {
            id: id,
            name: name,
            owner: owner,
            description: description,
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
    },
    playlistEntryOut: (room_id, video_url) => {
        return {
            room_id: room_id,
            video_url: video_url
        }
    },
    playlistEntryIn: (id, room_id, video_path, created_at) => {
        console.log(video_path);
        return {
            id: id,
            room_id: room_id,
            video_path: video_path,
            created_at: created_at
        }
    }
}

export default Serializer;
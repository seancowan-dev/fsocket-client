import React from 'react';
import { observable, action, computed } from 'mobx';
import SessionStore from './session.store';
import Helpers from './helpers.store';

class RoomStore {
    @observable rooms = [[ // This will be filled by the API later, but for now is just static
        // {
        //     "name": "test room one",
        //     "id": "ec0eb6c9-bafa-48a5-96b0-5820a2cfdcc9",
        //     "locale": "CAN", // Use ISO Alpha-3
        //     "desc": "This is a test room and it is fun and stuff come say hi!"
        // },
    ]]

    // Actions
    @action pageCheck = (last, json) => {
        if (last === 20) { // If the length of the last array element is 20
            // should insert into a new array elem/page   
            this.setRoomInNew(json);
        }
        if (last < 20) { // Otherwise if the length is less than 20
            // should insert into the existing element
            this.setRoomInCurrent(json);
        } 
    }
    // @action removeRoomFromList = (uuid) => {
    //     let shouldDelete = false;
    //     let pageIDX, roomIDX;
    //     this.rooms.forEach((page, idx) => {
    //         page.find((roomObject, ridx) => {
    //             if (roomObject.id === uuid) {
    //                 shouldDelete = true;
    //                 pageIDX = idx;
    //                 roomIDX = ridx;
    //             }
    //             return null;
    //         })
    //         return null;
    //     })
    //     if (shouldDelete === true) {
    //         this.rooms[pageIDX].splice(roomIDX, 1);
    //     }
    // }

    @action listRoom = (roomJSON) => { // Enters the room into the front-end store to avoid repeated fetch calls
        const checkLastArrayElem  = (json) => {
            let last = this.getLastArrayLength;
            let { id, name, description } = json;
            let requiredElems = {
                "id": id,
                "name": name,
                "description": description
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
                this.pageCheck(last, json);
            }
            if (errors.length === 0 && roomJSON.password !== "") { // Do this if a password is entered
                json.password = roomJSON.password;
                this.pageCheck(last, json);
            }
            if (errors.length > 0) {
                errors.forEach(errorObj => {
                    console.error(errorObj.error);
                })
            }

        }
        checkLastArrayElem(roomJSON);
    }

    @action addUserToRoom = (serial) => { // Joins a user to the room
        let array = this.getRooms; // Get all the rooms
        let loc = { // Placeholder for indices
            page: null,
            room: null
        }
        array.map((roomPage, roomPageIdx) => { // Map the array of room pages
            return roomPage.map((room, roomIdx) => { // Map the array of rooms
                if (room.id = serial.room_id) { // If the room id is equal to the id of the user request record the indices
                    loc.page = roomPageIdx;
                    loc.room = roomIdx;
                }
            })
        });
        if (this.rooms[loc.page][loc.room].members === undefined) {
            this.rooms[loc.page][loc.room].members = [];
        }
        if (this.rooms[loc.page][loc.room].members !== undefined) {
            let exists = this.rooms[loc.page][loc.room].members.find(member => {
                return member.id = serial.user_id;
            });
            if (exists === undefined) {
                this.rooms[loc.page][loc.room].members.push(serial);
            }
        }
        
    }

    //Getters
    @computed get getRooms() {
        return this.rooms.slice();
    }

    @computed get getRoomArraysLength() {
        return this.rooms.length
    }

    @computed get getLastArrayLength() {
        return this.rooms[this.rooms.length - 1].length;
    }

    //Setters

    @action setRoomInCurrent = (obj) => {
        this.rooms[this.rooms.length - 1].push(obj);
    }

    @action setRoomInNew = (obj) => {
        this.rooms.push([obj]);
    }
}

export default new RoomStore();
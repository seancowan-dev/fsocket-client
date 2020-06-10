import React from 'react';
import { observable, action, computed } from 'mobx';

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
    @action removeRoomFromList = (uuid) => {
        let shouldDelete = false;
        let pageIDX, roomIDX;
        this.rooms.forEach((page, idx) => {
            page.find((roomObject, ridx) => {
                if (roomObject.id === uuid) {
                    shouldDelete = true;
                    pageIDX = idx;
                    roomIDX = ridx;
                }
                return null;
            })
            return null;
        })
        if (shouldDelete === true) {
            this.rooms[pageIDX].splice(roomIDX, 1);
        }
    }

    //Getters
    @computed get getRooms() {
        return this.rooms;
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
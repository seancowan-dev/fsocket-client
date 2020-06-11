import React from 'react';
import { observable, action, computed } from 'mobx';
import LocalSession from '../view_comps/local/helpers/session';
import RoomStore from './room.store';

// This file stores important information about the current user session

// Notes - All rooms are stored in the room.store.js in an array of arrays of room objects
// These room objects are matched to id object in userRooms stored in this file

class SessionStore {

    // Navigation
        // These are values required for the user's navigation of the site

        // User

        @observable ipInfo = {};

        @action setIpInfo = (info) => {
            this.ipInfo = info;
        }

        @computed get getUserLocale() {
            return this.ipInfo.countryCode;
        }

        @observable userInfo = {
            uuid: "",
            rooms: []
        }

        @observable userRooms = [];

            // Setters
            @action setUserID = (uuid) => {
                this.userInfo.uuid = uuid;
            }
            @action setAddUserRoom = (roomID) => {
                this.userInfo.rooms.push(roomID);
            }
            @action setRemoveUserRoom = (roomID) => {
                if (this.userInfo.rooms.includes(roomID) === true) {
                    let idx = this.userInfo.rooms.indexOf(roomID);
                    let newArr = this.userInfo.rooms.splice(idx - 1, 1);
                    this.userInfo.rooms = newArr;
                }
            }
            @action setUserRooms = (rooms) => {
                this.userRooms = rooms;
            }
            // Getters
            @computed get getUserID() {
                return this.userInfo.uuid;
            }
            @computed get getUserRoomMembership() {
                return this.userInfo.rooms;
            }
            @computed get getUserRooms() {
                return this.userRooms;
            }

        // Room List
        @observable roomPage = 1;

        // Set
        @action setRoomPage = (next) => {
            this.roomPage = next;
        }
        // Get
        @computed get getRoomPage() {
            return this.roomPage;
        }

        // Room

        // Actions
        @action closeRoom = (uuid) => { // Close a room entirely
            this.setRemoveUserRoom(uuid);
            this.setDeleteRoom(uuid);
            RoomStore.removeRoomFromList(uuid);
        }

        @observable userSendMessage = "";

            // Set
            @action setUserSendMessage = (message) => {
                this.userSendMessage = message;
            }

            // Get
            @computed get getUserSendMessage() {
                return this.userSendMessage;
            }

        @observable roomMessages = [];

            // Set
            @action setRoom = (uuid) => { // Sets up a room message store object
                this.roomMessages.push({
                    "id": uuid,
                    "messages": [] // Messages are an array, messages stored in order
                })
            }

            @action setDeleteRoom = (uuid) => { // Delete the room from the list of rooms
                this.roomMessages.find((room, idx) => {
                    if (room.id === uuid) {
                        this.roomMessages.splice(idx, 1);
                    }
                })
            }

            @action setRoomMessage = (uuid, message) => {
                this.roomMessages.find((room) => {
                    if (room.id === uuid) {
                        room.messages.push({
                            "id": LocalSession.getUserID(),
                            "name": LocalSession.getUserName(),
                            "message": message
                        });
                    }
                });
            }

            // Get
            @action getChatRoom(uuid) {
                let roomData = this.roomMessages.find(room => {
                    if (uuid === room.id) {
                        return room;
                    }
                    return null;
                })
                if (roomData !== null || undefined || "") {
                    return roomData;
                }
                return null;
            }

        // Modal

        @observable modal = {
            modalDisplay: "none",
            newRoomName: "",
            newRoomDescription: "",
            newRoomPassword: ""
        }

            //Setters
            @action setModalDisplay = (input) => {
                this.modal.modalDisplay = input;
            }
            @action setNewRoomName = (input) => {
                this.modal.newRoomName = input;
            }
            @action setNewRoomDescription = (input) => {
                this.modal.newRoomDescription = input;
            }
            @action setNewRoomPassword = (input) => {
                this.modal.newRoomPassword = input;
            }
            //Getters
            @computed get getModalDisplay() {
                return this.modal.modalDisplay;
            }
            @computed get getNewRoomName() {
                return this.modal.newRoomName;
            }
            @computed get getNewRoomDescription() {
                return this.modal.newRoomDescription;
            } 
            @computed get getNewRoomPassword() {
                return this.modal.newRoomPassword;
            }        
}

export default new SessionStore();
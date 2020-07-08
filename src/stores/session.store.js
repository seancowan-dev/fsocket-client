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

        @observable userMessage = "";

        @action setUserSendMessage(message) {
            this.userMessage = message;
        }

        @computed get getUserSendMessage() {
            return this.userMessage;
        }

        @action setIpInfo = (info) => {
            this.ipInfo = info;
        }

        @computed get getUserLocale() {
            return this.ipInfo.countryCode;
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
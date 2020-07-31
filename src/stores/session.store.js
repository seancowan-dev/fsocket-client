import { observable, action, computed } from 'mobx';

// This file stores important information about the current user session

// Notes - All rooms are stored in the room.store.js in an array of arrays of room objects
// These room objects are matched to id object in userRooms stored in this file

class SessionStore {

    // Navigation
        // These are values required for the user's navigation of the site

        // User

        @observable userMessage = ""; // The message the user is currently typing

        @observable currentRoomPlaylist; // The playlist for the current room the user is in

        // Setters
        @action setCurrentRoomPlaylist(list) { // Setter for playlist
            this.currentRoomPlaylist = list;
        }
        @action setUserSendMessage(message) { // Setter for message
            this.userMessage = message;
        }

        // Getters
        @computed get getCurrentRoomPlaylist() { // Getter for playlist
            return this.currentRoomPlaylist;
        }
        @computed get getUserSendMessage() { // Getter for message
            return this.userMessage;
        }

        // Modal

        @observable modal = { // Default modal input
            modalDisplay: "none",
            lastUserScroll: [0, 0], // Stores where the user last scrolled for when they close the modal
            newRoomName: "",
            newRoomDescription: "",
            modalMessageDisplay: "none",
            modalMessages: []
        }

            //Setters
            @action setModalDisplay = (input) => { // Set the modal to be displayed, or not
                this.modal.modalDisplay = input;
            }
            @action setModalMessageDisplay = (input) => {
                this.modal.modalMessageDisplay = input;
            }
            @action setModalMessages = (input) => {
                this.modal.modalMessages = input;
            }
            @action setNewRoomName = (input) => { // Set the new room nae
                this.modal.newRoomName = input;
            }
            @action setNewRoomDescription = (input) => { // Set the new room description
                this.modal.newRoomDescription = input;
            }
            @action setLastUserScroll = (x, y) => {
                this.modal.lastUserScroll[0] = x;
                this.modal.lastUserScroll[1] = y;
            }
            //Getters
            @computed get getModalDisplay() { // Get the current display state of the modal
                return this.modal.modalDisplay;
            }
            @computed get getModalMessageDisplay() {
                return this.modal.modalMessageDisplay;
            }
            @computed get getModalMessages() {
                return this.modal.modalMessages.slice();
            }
            @computed get getNewRoomName() { // Get the currently entered value of the room name field
                return this.modal.newRoomName;
            }
            @computed get getNewRoomDescription() { // Get the currently entered value of the room description field
                return this.modal.newRoomDescription;
            }
            @computed get getLastUserScroll() {
                return this.modal.lastUserScroll;
            }   
}

export default new SessionStore();
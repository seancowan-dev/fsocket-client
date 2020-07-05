import React from 'react'
import uuid from 'uuid';
import sessionStore from '../../../stores/session.store';
import roomStore from '../../../stores/room.store';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

class SessionHelpers {
    registerUser() {
        const capitalizedName: string = uniqueNamesGenerator({
          dictionaries: [colors, adjectives, animals],
          style: 'capital'
        }); // Ex: Red_Big_Donkey
        
        window.localStorage.setItem('fsocket-userID', uuid.v4());
        window.localStorage.setItem('fsocket-userName', capitalizedName);
    }
    unregisterUser() {
        window.localStorage.removeItem('fsocket-userID');
        window.localStorage.removeItem('fsocket-userName');
    }
    checkUser() {
        if (window.localStorage.getItem('fsocket-userID') === null) {
            return false;
        } else {
            return true;
        }
    }
    getUserID() {
        return window.localStorage.getItem('fsocket-userID');
    }
    getUserName() {
        return window.localStorage.getItem('fsocket-userName');
    }
    getUserRooms() {
        let userRooms = sessionStore.getUserRoomMembership.slice();
        let allRooms = roomStore.getRooms.slice();
        let userRoomObjects = [];

        userRooms.forEach(room => {
          allRooms.map(roomPage => {
            Object.values(roomPage.slice()).find(roomInfo => {
              if (roomInfo.id === room) {
                userRoomObjects.push(roomInfo);
              }
            })
          })
        })
        return userRoomObjects;
    }
}

export default new SessionHelpers();
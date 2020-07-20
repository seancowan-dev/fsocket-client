import React from 'react'
import uuid from 'uuid';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

class SessionHelpers {
  
    registerUser() {
        const capitalizedName: string = uniqueNamesGenerator({
          dictionaries: [colors, adjectives, animals],
          style: 'capital'
        }); // ex: Red_Big_Donkey
        
        window.localStorage.setItem('fsocket-userID', JSON.stringify(uuid.v4()));
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
}

export default new SessionHelpers();
import uuid from 'uuid';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

class SessionHelpers {
  
    registerUser() { // Store user info in the local session window
        const capitalizedName: string = uniqueNamesGenerator({ // Generate a unique name
          dictionaries: [colors, adjectives, animals], // Use color, adjective, animal
          style: 'capital'
        }); // ex: Red_Big_Donkey
        
        window.localStorage.setItem('fsocket-userID', JSON.stringify(uuid.v4())); // Store the uuid of this user
        window.localStorage.setItem('fsocket-userName', capitalizedName); // Store the name of the user
    }
    unregisterUser() {
        window.localStorage.removeItem('fsocket-userID'); // Remove the user uuid from the local session
        window.localStorage.removeItem('fsocket-userName'); // Remove the user name from the local session
    }
    checkUser() {
        if (window.localStorage.getItem('fsocket-userID') === null) { // If the user has not been stored, return false
            return false;
        } else { // Otherwise return true
            return true;
        }
    }
    getUserID() {
        return window.localStorage.getItem('fsocket-userID'); // Get the uuid from the local session
    }
    getUserName() {
        return window.localStorage.getItem('fsocket-userName'); // Get the user name from the local session
    }
}

export default new SessionHelpers();
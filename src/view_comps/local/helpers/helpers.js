import React from 'react';
import roomStore from '../../../stores/room.store';
import sessionStore from '../../../stores/session.store';
import SessionHelpers from './session';
import uuid from 'uuid';

class LocalHelpers {
    handleErrors(response) { // prepares error message for HTTP request errors
        if (response.ok === true) {
            return response.json();
        } 
        else {
            console.warn(`Code: ${response.status} Message: ${response.statusText}`);
        }
    }
    async ipLookUp() {
        return await fetch(`https://damp-falls-21610.herokuapp.com/site/tools/getIP`, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'content-type': 'application/json'
            }
        })
        .then(res => { 
            return this.handleErrors(res);
        })
        .catch(err => {
            console.warn(err);
        })
    }

}

export default new LocalHelpers();
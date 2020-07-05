import React from 'react';
import { observable, action, computed } from 'mobx';
import SessionStore from './session.store';
import RoomStore from './room.store';
import $ from 'jquery';
import config from '../config';
import countryData from '../assets/world.json';

// This file stores helper functions, and not data


class Helpers {
    // Navigation
        // These are values required for the user's navigation of the site

        // Room List
        @action pageButtonVisibility = () => { // Each time the component renders check if the previous or next buttons should be disabled or not
   
            function hideBoth(arrLength) {
                if (arrLength <= 1) {
                    // should make sure both buttons are inactive
                    $('.room-list-controls-prev').attr("disabled", true);
                    $('.room-list-controls-next').attr("disabled", true);
                }
            }
            if (RoomStore.rooms.length === SessionStore.getRoomPage) { // If the current page is equal to the number of pages
                // should disable the next button
                $('.room-list-controls-next').attr("disabled", true);

                // and make sure that previous is active
                $('.room-list-controls-prev').attr("disabled", false);
                // unless there is only one page of entries
                hideBoth(RoomStore.getRoomArraysLength);
            }
            if (SessionStore.getRoomPage <= 1) { // If the room page is less than or equal to 1 that means we are on the first page
                // should disable the previous button
                $('.room-list-controls-prev').attr("disabled", true);
                // and make sure that next is active
                $('.room-list-controls-next').attr("disabled", false);
                // unless there is only one page of entries
                hideBoth(RoomStore.getRoomArraysLength);
            }
            if (SessionStore.getRoomPage > 1 && SessionStore.getRoomPage < RoomStore.rooms.length) { // If the room page is greater than 1 and less than the max number of room pages
                // should make sure both buttons are active
                $('.room-list-controls-prev').attr("disabled", false);
                $('.room-list-controls-next').attr("disabled", false);
                // unless there is only one page of entries
                hideBoth(RoomStore.getRoomArraysLength);
            }
        }
        checkIDX(pageNumber) {
            let userPage = SessionStore.getRoomPage;
            if (pageNumber === userPage) {
                return true;
            }
            else {
                return false;
            }
        }
        @action checkPageDisplay = (input) => {
            if (this.checkIDX(input) === true) {
                if (this.getWidth() > 769) {
                    return "table-page-display";
                }
                if (this.getWidth() <= 768) {
                    return "flex-page-display";
                }
            } else {
                return "none-page-display";
            }
        }

    // Tool Functions
    handleErrors(response) { // prepares error message for HTTP request errors
        if (response.ok === true) {
            return response.json();
        } 
        else {
            console.warn(`Code: ${response.status} Message: ${response.statusText}`);
        }
    }
    @action async ipLookUp() {
        return await fetch(`${config.SOCKET_URL}/site/tools/getIP`, {
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
    @action getWidth = () => {
        return Math.max(
          document.body.scrollWidth,
          document.documentElement.scrollWidth,
          document.body.offsetWidth,
          document.documentElement.offsetWidth,
          document.documentElement.clientWidth
        );
      }
}

export default new Helpers();
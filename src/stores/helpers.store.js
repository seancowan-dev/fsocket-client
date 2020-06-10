import React from 'react';
import { observable, action, computed } from 'mobx';
import sessionStore from './session.store';
import roomStore from './room.store';
import $ from 'jquery';
import countryData from '../assets/world.json';

// This file stores helper functions, and not data


class Helpers {

    // Navigation
        // These are values required for the user's navigation of the site

        // Room List
        @action pageButtonVisibility = (target) => { // Each time the component renders check if the previous or next buttons should be disabled or not
            let prev, next;

            function hideBoth(arrLength) {
                if (arrLength <= 1) {
                    // should make sure both buttons are inactive
                    prev.disabled = true;
                    next.disabled = true;
                }
            }
            // set button values
            if (target.className === "room-list-controls-prev") {  // user clicked prev button
                prev = target;
                next = target.parentElement.lastChild;
            }
            if (target.className === "room-list-controls-next") { // user clicked next button
                prev = target.parentElement.firstChild;
                next = target;
            }
            if (target.id = "#document") { // page load
                prev = target.children[0].childNodes[2].children[1].children[5].children[0].children[2].children[1][0];
                next = target.children[0].childNodes[2].children[1].children[5].children[0].children[2].children[1][1];
            }
            if (roomStore.rooms.length === sessionStore.getRoomPage) { // If the current page is equal to the number of pages
                // should disable the next button
                next.disabled = true;

                // and make sure that previous is active
                prev.disabled = false;
                // unless there is only one page of entries
                hideBoth(roomStore.getRoomArraysLength);
            }
            if (sessionStore.getRoomPage <= 1) { // If the room page is less than or equal to 1 that means we are on the first page
                // should disable the previous button
                prev.disabled = true;
                // and make sure that next is active
                next.disabled = false;
                // unless there is only one page of entries
                hideBoth(roomStore.getRoomArraysLength);
            }
            if (sessionStore.getRoomPage > 1 && sessionStore.getRoomPage < roomStore.rooms.length) { // If the room page is greater than 1 and less than the max number of room pages
                // should make sure both buttons are active
                prev.disabled = false;
                next.disabled = false;
                // unless there is only one page of entries
                hideBoth(roomStore.getRoomArraysLength);
            }
        }
        
        @action checkPageDisplay = () => {
            let pages = document.querySelectorAll(".room-pages");

            pages.forEach(page => {
                let pageNum = page.classList[page.classList.length - 1];
                let userPage = sessionStore.getRoomPage;

                if (parseInt(pageNum) === userPage) {
                    if (this.getWidth() > 769) {
                        page.style.display = "table-row-group";
                    }
                    if (this.getWidth() <= 768) {
                        page.style.display = "flex";
                    }
                } else {
                    page.style.display = "none";
                }
            });
        }

    // Tool Functions

    @action getWidth = () => {
        return Math.max(
          document.body.scrollWidth,
          document.documentElement.scrollWidth,
          document.body.offsetWidth,
          document.documentElement.offsetWidth,
          document.documentElement.clientWidth
        );
      }
    @action ipLookUp = () => {
        $.ajax('https://damp-falls-21610.herokuapp.com/getIP')
        .then(res => {
            sessionStore.ipInfo = res;
        });
      }
}

export default new Helpers();
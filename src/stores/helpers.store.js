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
        @action pageButtonVisibility = () => { // Each time the component renders check if the previous or next buttons should be disabled or not
   
            function hideBoth(arrLength) {
                if (arrLength <= 1) {
                    // should make sure both buttons are inactive
                    $('.room-list-controls-prev').attr("disabled", true);
                    $('.room-list-controls-next').attr("disabled", true);
                }
            }
            if (roomStore.rooms.length === sessionStore.getRoomPage) { // If the current page is equal to the number of pages
                // should disable the next button
                $('.room-list-controls-next').attr("disabled", true);

                // and make sure that previous is active
                $('.room-list-controls-prev').attr("disabled", false);
                // unless there is only one page of entries
                hideBoth(roomStore.getRoomArraysLength);
            }
            if (sessionStore.getRoomPage <= 1) { // If the room page is less than or equal to 1 that means we are on the first page
                // should disable the previous button
                $('.room-list-controls-prev').attr("disabled", true);
                // and make sure that next is active
                $('.room-list-controls-next').attr("disabled", false);
                // unless there is only one page of entries
                hideBoth(roomStore.getRoomArraysLength);
            }
            if (sessionStore.getRoomPage > 1 && sessionStore.getRoomPage < roomStore.rooms.length) { // If the room page is greater than 1 and less than the max number of room pages
                // should make sure both buttons are active
                $('.room-list-controls-prev').attr("disabled", false);
                $('.room-list-controls-next').attr("disabled", false);
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
}

export default new Helpers();
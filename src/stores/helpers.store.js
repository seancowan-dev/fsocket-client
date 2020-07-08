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
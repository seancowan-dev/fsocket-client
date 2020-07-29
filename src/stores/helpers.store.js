import { action } from 'mobx';

// This file stores helper functions, and not data


class Helpers {

    // Navigation
        // These are values required for the user's navigation of the site

    // Tool Functions

    @action getWidth = () => { // Get the current width of these elements for use in react-responsive
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
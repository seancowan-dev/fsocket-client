import { observable, action, computed } from 'mobx';

// This file contains functions for User Experience Controls
// In other words this file is primarily click handlers for UI elements
// the only UI elements which will not appear here are those for creation
// of rooms, or room messages.  These are separated because they are a core
// function of the app, and while they control UI elements, it is not UX
// control proper.

class uxcStore {

    // Manage Room Ownership

        // Select New Host Modal

        // Opening

        @observable selectHostModalOpen = false; // The modal should be closed on default

        @action openHostModal = (bool) => { // Toggle the host modal
            if (bool === false)  {
                this.selectHostModalOpen = true;
            }
            if (bool === true) {
                this.selectHostModalOpen = false;
            }
        }

        @computed get getSelectHostModalState() {
            return this.selectHostModalOpen;
        }
}

export default new uxcStore();
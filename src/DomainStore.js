import RoomStore from './stores/room.store';
import SessionStore from './stores/session.store';
import UXCStore from './stores/uxc.store';
import Helpers from './stores/helpers.store';

class DomainStore{
  // Import external stores
  constructor() {

    this.roomStore = RoomStore;
    this.sessionStore = SessionStore;
    this.uxcStore = UXCStore;
    this.helpers = Helpers;

  }
}
export default new DomainStore();
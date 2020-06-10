import {observable,action} from 'mobx';
import uuid from "uuid";
import RoomStore from './stores/room.store';
import SessionStore from './stores/session.store';
import Helpers from './stores/helpers.store';

class DomainStore{
  // Import external stores
  constructor() {

    this.roomStore = RoomStore;
    this.sessionStore = SessionStore;
    this.helpers = Helpers;

  }
}
export default new DomainStore();
import React from 'react';
import { inject, observer } from 'mobx-react';
import { A } from 'hookrouter';
import uuid from 'uuid';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import LocalSession from '../../local/helpers/session';

const Slide = inject('sessionStore', 'roomStore')(observer((props) => {
    const li_style = { // Place this only on list items which are to be section headers
        textAlign: "center",
    }

    const user_rooms = props.roomStore.getRooms; // Get all the rooms

    let filtered_rooms = user_rooms.filter(room => { // Filter rooms for only those which are owned by this user
      if (room.owner === LocalSession.getUserName()) { // If one is found
        return room; // Return it
      }
      return null;
    })

    let rooms_list = filtered_rooms.map(room => { // For each of the rooms this user owns return a link object
      return <li key={uuid.v4()} className="sidebarListItem" ><SubdirectoryArrowRightIcon /><A href={`/site/room/` + room.id}>{room.name}</A></li>
    })

    return (
        <div id="sidebarMenu">
        <ul className="sidebarMenuInner">
          <li key={uuid.v4()} style={li_style}>fSocket<span>User Menu</span></li>
          <li key={uuid.v4()} className="sidebarListItem"><SubdirectoryArrowRightIcon /><A href="/">Home</A></li>
          <li key={uuid.v4()} style={li_style}>Your Open Rooms</li>
          {rooms_list}
        </ul>
      </div>
    );
}));

export default Slide;
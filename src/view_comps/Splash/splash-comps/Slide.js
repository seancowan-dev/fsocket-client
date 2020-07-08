import React from 'react';
import { inject, observer } from 'mobx-react';
import { A } from 'hookrouter';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

const Slide = inject('sessionStore', 'roomStore')(observer((props) => {
    const li_style = { // Place this only on list items which are to be section headers
        textAlign: "center",
    }

    return (
        <div id="sidebarMenu">
        <ul class="sidebarMenuInner">
          <li style={li_style}>fSocket<span>User Menu</span></li>
          <li className="sidebarListItem"><SubdirectoryArrowRightIcon /><A href="/">Home</A></li>
          <li style={li_style}>Your Open Rooms</li>
        </ul>
      </div>
    );
}));

export default Slide;
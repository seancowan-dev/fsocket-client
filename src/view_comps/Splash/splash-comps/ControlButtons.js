import React from 'react';
import { inject, observer } from 'mobx-react';

const ControlButtons = inject("sessionStore", "roomStore", "helpers")(observer((props) => {

    window.addEventListener("load", (e) => {
        props.helpers.checkPageDisplay();
        props.helpers.pageButtonVisibility(e.target);
    });
    
    let startVal = () => { // Make sure that the previous button is not enabled if page = 1
        if (props.sessionStore.getRoomPage <= 1) {
            return true
        }
    }

    return (
        <form className="room-list-controls">
            <button className="room-list-controls-prev" disabled={startVal()} onClick={(e) => {
                e.preventDefault();
                if (props.sessionStore.getRoomPage !== 0) {
                    props.sessionStore.setRoomPage(props.sessionStore.getRoomPage - 1);
                }
                props.helpers.checkPageDisplay();
                props.helpers.pageButtonVisibility(e.target);
            }}>Previous Page</button>
            <button className="room-list-controls-next" onClick={(e) => {
                e.preventDefault();
                if (props.sessionStore.getRoomPage !== props.roomStore.rooms.length) {
                    props.sessionStore.setRoomPage(props.sessionStore.getRoomPage + 1);
                }
                props.helpers.checkPageDisplay();
                props.helpers.pageButtonVisibility(e.target);
            }}>Next Page</button>
        </form>
    );
}));

export default ControlButtons;
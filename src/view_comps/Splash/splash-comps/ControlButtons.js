import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

const ControlButtons = inject("sessionStore", "roomStore", "helpers")(observer((props) => {

    return (
        <form className="room-list-controls">
            <button className="room-list-controls-prev" onClick={(e) => {
                e.preventDefault();
            }}>Previous Page</button>
            <button className="room-list-controls-next" onClick={(e) => {
                e.preventDefault();
            }}>Next Page</button>
        </form>
    );
}));

export default ControlButtons;
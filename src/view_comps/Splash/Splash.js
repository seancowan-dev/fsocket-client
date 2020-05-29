import React from 'react';
import { inject, observer } from 'mobx-react';
import Logo from './splash-comps/Logo';
import RoomList from './splash-comps/RoomList';

const Splash = observer((props) => {
    return (
        <div className="splash container">
            <div className="image">
                <Logo />
                fSocket logo will go here with the text
                'click here to begin' - this will open a new room
            </div>
            <div className="room-list-container">
                <RoomList />
            </div>
        </div>
    );
});

export default Splash;
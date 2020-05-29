import React from 'react';
import RoomComp from '../../view_comps/Room/Room';
import Chat from '../../view_comps/Chat/Chat';
import Nav from '../../view_comps/Navigation/Nav';
import { inject, observer } from 'mobx-react';
import uuid from 'uuid';

const Room = observer((props) => {
    return (<>
                <Nav />
                
                <div className="room-container">
                    <RoomComp />
                    <Chat />
                </div>
            </>
            );    
});

export default Room;
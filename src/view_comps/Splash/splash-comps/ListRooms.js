import React from 'react';
import { inject, observer } from 'mobx-react';
import { navigate } from 'hookrouter';
import uuid from 'uuid';
import MediaQuery from 'react-responsive';
import ScrollText from 'react-scroll-text';

const RoomList = inject('sessionStore', 'roomStore', 'helpers')(observer((props) => {
    if (props.sessionStore.getUserLocale !== undefined) { // Wait until we have user location info to render
        let roomPages = props.roomStore.rooms.map((page, idx) => {
        
            let rooms = page.map(room => {
                // Mobile and tablet users have stacked tiles of divs
                // larger sizes have actual tables  
    
                // User count depends on API functions and websockets so for now it is a dummy 
                // For now flags are only displaying the flag of the user viewing the page; later once room API is done, they will show flag of room host origin
            return (<><MediaQuery maxWidth={768}><div key={uuid.v4()} className="room-details" onClick={(e) => {
                navigate(`/site/room/${room.id}`);
            }}>
                        <p className="room-name" id={room.id}>{room.name}</p>
                        <p className="room-location"><img src={process.env.VERCEL_URL + 'assets/flags/32x32/' + props.sessionStore.getUserLocale + ".png"} /></p>
                        <p className="room-users-count">0/8</p>
                        <ScrollText className="room-description" speed={50}>{room.desc}</ScrollText>
                    </div>
                    </MediaQuery>
                    <MediaQuery minWidth={769}>
                        <tr key={uuid.v4()} className="room-details" onClick={(e) => {
                            navigate(`/site/room/${room.id}`);
                        }}>
                            <td className="room-location"><img src={process.env.PUBLIC_URL + 'assets/flags/32x32/' + props.sessionStore.getUserLocale + ".png"} /></td>
                            <td className="room-name" id={room.id}>{room.name}</td>
                            <td className="room-users-count">0/8</td>
                            <td className="room-description">{room.desc}</td>
                        </tr>
                    </MediaQuery></>);
            });
            
                return <><MediaQuery minWidth={769}>
                <tbody key={uuid.v4()} className={"room-pages " + (idx + 1)}>{rooms}</tbody></MediaQuery>
                <MediaQuery maxWidth={768}>
                <div key={uuid.v4()} className={"room-pages " + (idx + 1)}>{rooms}</div></MediaQuery>
                </>; 
        });
         
        return roomPages;
    }
}));

export default RoomList;
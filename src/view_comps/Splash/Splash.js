import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import Logo from './splash-comps/Logo';
import RoomList from './splash-comps/RoomList';
import socketIOClient from 'socket.io-client';
const ENDPOINT = "http://127.0.0.1:80";

const Splash = inject('sessionStore')(observer((props) => {
    // const [res, setRes] = useState("");

    // useEffect(() => {
    //     const socket = socketIOClient(ENDPOINT);
    //     socket.on("news", data => {
    //         setRes(data);
    //     });
    // }, []);


    // function TestThings() {
    //     const socket = socketIOClient(ENDPOINT);
    //     socket.emit("my other event", { hello: 'world-too' });
    // }

    // console.log(res.hello);

    return (<div className="splash container">
            <div className="image">
                <Logo />
            </div>
            {/* <button onClick={(e) => {
                TestThings();
            }}>Test Me</button> */}
            <button className="create-new-room" onClick={(e) => {
                    e.preventDefault();
                    props.sessionStore.setModalDisplay("block");
            }}>Create Room</button>
            <RoomList />
        </div>
    );
}));

export default Splash;
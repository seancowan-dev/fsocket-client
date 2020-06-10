import React from 'react';
import Splash from '../../view_comps/Splash/Splash';
import Nav from '../../view_comps/Navigation/Nav';
import { inject, observer } from 'mobx-react';
import SessionHelpers from '../../view_comps/local/helpers/session';
import Slide from '../../view_comps/Splash/splash-comps/Slide';
import ModalComp from '../../view_comps/Modal/Modal';
import Footer from '../../view_comps/Footer/Footer';
import uuid from 'uuid';

const Primary = inject('sessionStore')(observer((props) => {
    // window.addEventListener("load", () => { // Do this the first time the window loads
    //     if (SessionHelpers.checkUser() === false) { // Check if the user is registered already
    //         SessionHelpers.registerUser(); // If not register the user
    //     }
    //     if (SessionHelpers.checkUser() === true) { // Otherwise add user ID to the local session store
    //         props.sessionStore.userInfo.uuid = SessionHelpers.getUserID();
    //         props.sessionStore.userInfo.name = SessionHelpers.getUserName();
    //     }
    // })

    // note to self: streamline this to a single function later
    // Do this when the user has come back to the main page, but not reloaded and needs a new ID/name
    if (SessionHelpers.checkUser() === false) { // Check if the user is registered already
        SessionHelpers.registerUser(); // If not register the user
    }
    if (SessionHelpers.checkUser() === true) { // Otherwise add user ID to the local session store
        props.sessionStore.userInfo.uuid = SessionHelpers.getUserID();
        props.sessionStore.userInfo.name = SessionHelpers.getUserName();
    }
    return (<>
                <Nav />
                <Slide />
                <ModalComp />
                <div className="container">
                    <Splash />
                </div>
                <Footer />
            </>
            );    
}));

export default Primary;
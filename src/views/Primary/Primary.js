import React from 'react';
import Splash from '../../view_comps/Splash/Splash';
import Nav from '../../view_comps/Navigation/Nav';
import { inject, observer } from 'mobx-react';
import SessionHelpers from '../../view_comps/local/helpers/session';
import Slide from '../../view_comps/Splash/splash-comps/Slide';
import ModalComp from '../../view_comps/Modal/Modal';
import Footer from '../../view_comps/Footer/Footer';

const Primary = inject('sessionStore')(observer((props) => {
    // Do this when the user has come back to the main page, but not reloaded and needs a new ID/name
    if (SessionHelpers.checkUser() === false) { // Check if the user is registered already
        SessionHelpers.registerUser(); // If not register the user
    }
    return (<div className="main-container">
                <Nav />
                <Slide />
                <ModalComp />
                <div className="container">
                    <Splash />
                </div>
                <Footer />
            </div>
            );    
}));

export default Primary;
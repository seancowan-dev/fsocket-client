import React from 'react';
import Nav from '../../view_comps/Navigation/Nav';
import { inject, observer } from 'mobx-react';
import Slide from '../../view_comps/Splash/splash-comps/Slide';
import Admin from '../../view_comps/Admin/Admin';
import Footer from '../../view_comps/Footer/Footer';
import uuid from 'uuid';

const Panel = inject('sessionStore')(observer((props) => {
    return (<>
                <Nav />
                <Slide />
                <div className="container">
                    <Admin />
                </div>
                <Footer />
            </>
            );    
}));

export default Panel;
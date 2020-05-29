import React from 'react';
import Splash from '../../view_comps/Splash/Splash';
import Nav from '../../view_comps/Navigation/Nav';
import { inject, observer } from 'mobx-react';
import uuid from 'uuid';

const Primary = observer((props) => {
    return (<>
                <Nav />
                <div className="container">
                    <Splash />
                </div>
            </>
            );    
});

export default Primary;
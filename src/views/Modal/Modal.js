import React from 'react';
import ModalComp from '../../view_comps/Modal/Modal';
import Nav from '../../view_comps/Navigation/Nav';
import { inject, observer } from 'mobx-react';
import uuid from 'uuid';

const Modal = observer((props) => {
    return (<>
                <Nav />
                
                <div className="container">
                    <ModalComp />
                </div>
            </>
            );    
});

export default Modal;
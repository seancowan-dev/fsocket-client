import React from 'react';
import { inject, observer } from 'mobx-react';

const Modal = observer((props) => {
    return (
        <div className="modal">
            <form className="modal-form">
                <input type="text" placeholder="enter a room title" />
                <input type="text" placeholder="enter a room description" />
                <input type="text" placeholder="enter a room password (optional)" />
                <button>Create Room</button>
            </form> 
        </div>
    );
});

export default Modal;
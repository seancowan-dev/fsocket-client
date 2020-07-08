import React from 'react';
import { inject, observer } from 'mobx-react';
import SessionHelpers from '../../local/helpers/session';

const Message = observer((props) => {
    return (
        <li className="user-message">
            <div><h4>{props.user_name}</h4></div>
            <div><p>{props.message}</p></div>
        </li>
    );
});

export default Message;
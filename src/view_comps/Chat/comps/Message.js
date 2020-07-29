import React from 'react';
import { observer } from 'mobx-react';

const Message = observer((props) => {
    return (
        <div className="user-message">
            <div><h4>{props.user_name}</h4></div>
            <div><p>{props.message}</p></div>
        </div>
    );
});

export default Message;
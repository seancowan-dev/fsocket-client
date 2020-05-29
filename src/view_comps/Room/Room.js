import React from 'react';
import { inject, observer } from 'mobx-react';

const Room = observer((props) => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/x-frame-bypass";
    script.async = true;
    document.body.appendChild(script);

    return (
        <div className="room">
            <iframe is="x-frame-bypass" className="room-frame" width="100%" height="800px" src="https://www.yahoo.com/" title="Search the web"></iframe>
        </div>
    );
});

export default Room;
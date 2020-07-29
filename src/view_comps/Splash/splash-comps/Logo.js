import React from 'react';
import { observer } from 'mobx-react';
import fsocket from './assets/fsocketlogo.png';

const Logo = observer((props) => {
    return (
        <img alt="site logo" className="fsocket-logo" src={fsocket} />
    );
});

export default Logo;
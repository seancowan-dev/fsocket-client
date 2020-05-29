import React from 'react';
import { inject, observer } from 'mobx-react';
import relax from './assets/relax.png';

const Logo = observer((props) => {
    return (
        <img className="fsocket-logo" src={relax} />
    );
});

export default Logo;
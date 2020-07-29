import React from 'react';
import { observer } from 'mobx-react';
import relax from './assets/relax.png';

const Logo = observer((props) => {
    return (
        <img alt="site logo" className="fsocket-logo" src={relax} />
    );
});

export default Logo;
import React from 'react';
import { inject, observer } from 'mobx-react';

const FooterLogo = observer((props) => {
    return <a href={props.img_url}><img src={props.img_path} className={props.my_class}/></a>;
});

export default FooterLogo;
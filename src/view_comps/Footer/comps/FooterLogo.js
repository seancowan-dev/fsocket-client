import React from 'react';
import { observer } from 'mobx-react';

const FooterLogo = observer((props) => {
    return <a href={props.img_url}><img alt="site logo" src={props.img_path} className={props.my_class}/></a>;
});

export default FooterLogo;
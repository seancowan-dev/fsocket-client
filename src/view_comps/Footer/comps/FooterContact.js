import React from 'react';
import { inject, observer } from 'mobx-react';

const FooterContact = observer((props) => {
    return (
        <div className="footer-contact-info-container">
            <h3>Sean Cowan</h3>
            <a href="https://www.linkedin.com/in/seancowan-dev/">LinkedIn</a><br />
            <a href="https://seancowan-dev.github.io/portfolio-site/">Portfolio</a><br />
            <a href="https://github.com/seancowan-dev/">GitHub</a>
        </div>
    );
});

export default FooterContact;
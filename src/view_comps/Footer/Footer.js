import React from 'react';
import { observer } from 'mobx-react';
import FooterLogo from './comps/FooterLogo';
import FooterContact from './comps/FooterContact';

const Footer = observer((props) => {
    const reactLogo = <FooterLogo img_path="/assets/logos/react-logo.png" my_class="footer-logos react-logo" img_url="https://reactjs.org/"/>;
    const nodeLogo = <FooterLogo img_path="/assets/logos/node-logo.png" my_class="footer-logos node-logo" img_url="https://nodejs.org/en/about/"/>;
    const mobxLogo = <FooterLogo img_path="/assets/logos/mobx-logo.png" my_class="footer-logos mobx-logo" img_url="https://mobx.js.org/README.html"/>;
    return (
        <div className="primary-footer">
            <div className="primary-footer-legal-container">
                <div className="footer-copy-row">
                    <p><em>Copyright &copy; 2020<br />Sean Cowan Technical Solutions</em></p>
                </div>
                <div className="footer-logo-row">
                    {reactLogo}
                    {nodeLogo}
                    {mobxLogo}
                </div>
            </div>
            <FooterContact />
        </div>
    );
});

export default Footer;
import React from 'react';
import { observer, inject } from 'mobx-react';
import { A } from 'hookrouter';
import uuid from 'uuid';
import './Nav.css';

const Nav = observer((props) => {
    // Generate appropriate li keys and items for nav
        // some code here to do that later

    return (
        // Display the navigation
        <nav className="navigation" key={uuid.v4()}>
            <ul className="nav-links" key={uuid.v4()}>
                <li><A href="/">Main Wireframe</A></li>
                <li><A href="/site/room/modal">Modal Wireframe</A></li>
                <li><A href="/site/room/uuid">Room Wireframe</A></li>
            </ul>
        </nav>
    );
});

export default Nav;
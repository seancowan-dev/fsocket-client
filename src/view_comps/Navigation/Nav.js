import React from 'react';
import { observer } from 'mobx-react';
import uuid from 'uuid';
import './Nav.css';

const Nav = observer((props) => {
    // Generate appropriate li keys and items for nav
        // some code here to do that later
        
        // Display the navigation
    return (<>
                <nav className="navigation" key={uuid.v4()}>
                </nav>
                <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu"></input>
                    <label key={uuid.v4()} htmlFor="openSidebarMenu" className="sidebarIconToggle">
                    <div key={uuid.v4()} className="spinner diagonal part-1"></div>
                    <div key={uuid.v4()} className="spinner horizontal"></div>
                    <div key={uuid.v4()} className="spinner diagonal part-2"></div>
                </label>        
    </>);
});

export default Nav;
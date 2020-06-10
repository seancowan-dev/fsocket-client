import React from 'react';
import { observer, inject } from 'mobx-react';
import { A } from 'hookrouter';
import uuid from 'uuid';
import './Nav.css';

const Nav = observer((props) => {
    // Generate appropriate li keys and items for nav
        // some code here to do that later
        
        // Display the navigation
    return (<><nav className="navigation" key={uuid.v4()}>
        <A href="/site/admin/panel" className="admin-login-link">Admin Login</A>
        </nav>
        <input type="checkbox" class="openSidebarMenu" id="openSidebarMenu"></input>
            <label for="openSidebarMenu" class="sidebarIconToggle">
            <div class="spinner diagonal part-1"></div>
            <div class="spinner horizontal"></div>
            <div class="spinner diagonal part-2"></div>
        </label>        
    </>);
});

export default Nav;
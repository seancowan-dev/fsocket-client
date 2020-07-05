import React from 'react';
import { observer, inject } from 'mobx-react';
import { A } from 'hookrouter';
import uuid from 'uuid';
import './Nav.css';

const Nav = observer((props) => {
    // Generate appropriate li keys and items for nav
        // some code here to do that later
        
        // Display the navigation
    return (<React.Fragment>
                <nav 
                    key={uuid.v4()} 
                    className="navigation"
                >
                    <A 
                        href="/site/admin/panel" 
                        className="admin-login-link"
                    >
                        Admin Login
                    </A>
                </nav>
                <input 
                    key={uuid.v4()} 
                    type="checkbox" 
                    className="openSidebarMenu" 
                    id="openSidebarMenu"
                />
                    <label 
                        key={uuid.v4()} 
                        htmlFor="openSidebarMenu" 
                        className="sidebarIconToggle"
                    >
                    <div 
                        key={uuid.v4()} 
                        className="spinner diagonal part-1"
                    />
                    <div 
                        key={uuid.v4()} 
                        className="spinner horizontal"
                    />
                    <div 
                        key={uuid.v4()} 
                        className="spinner diagonal part-2"
                    />
                </label>        
            </React.Fragment>
        );
});

export default Nav;
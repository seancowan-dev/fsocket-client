import React from 'react';
import { inject, observer } from 'mobx-react';

const Admin = observer((props) => {
    return (
        <div className="admin-panel container">
            <h1>Administrator Panel</h1>
            <p>Here you can view all currently connected IP addresses, and then your blocked list of IPs.  Click an IP to bring up a modal with more info.</p>
            <br />
            <em>Note to test users/graders, since this requires the API to actually function at all, this is just a placeholder/dummy page in this iteration.
                Eventually the user will have to login with admin credentials to access this page.
            </em>
            <br />

            <h3>Currently Connected IPs</h3>
            <div className="connected-ips-container admin-container">
                <div className="head row admin-row">
                    <h5>IPv4 Address</h5>
                    <h5>Open Rooms</h5>
                    <h5>Origin Country</h5>
                </div>
                <div className="row admin-row">
                    <h5>This section depends on node</h5>
                    <h5>but this will display</h5>
                    <h5>like a table</h5>
                </div>
            </div>

            <h3>Currently Blocked IPs</h3>
            <div className="blocked-ips-container admin-container">
                <div className="head row admin-row">
                    <h5>IPv4 Address</h5>
                    <h5>Duration</h5>
                    <h5>Date Blocked</h5>
                </div>
                <div className="row admin-row">
                    <h5>This section depends on node</h5>
                    <h5>but this will display</h5>
                    <h5>like a table</h5>
                </div>
            </div>
        </div>
    );
});

export default Admin;
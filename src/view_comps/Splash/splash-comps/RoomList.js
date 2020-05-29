import React from 'react';
import { inject, observer } from 'mobx-react';

const RoomList = observer((props) => {
    return (
            <table class="room-list">
                <caption>Room List</caption>
                <thead>
                <tr>
                    <th>Location</th>
                    <th>Name</th>
                    <th># of Users</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                </tbody>
            </table>
    );
});

export default RoomList;
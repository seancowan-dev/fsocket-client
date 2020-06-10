import React from 'react';
import Primary from '../views/Primary/Primary';
import Room from '../views/Room/Room';
import Admin from '../views/Admin/Panel';

const routes = {
    "/": () => <Primary />,
    "/site/room/:uuid": ({uuid}) => <Room uuid={uuid}/>,
    "/site/admin/panel": () => <Admin />
};

export default routes;
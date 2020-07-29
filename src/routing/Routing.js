import React from 'react';
import Primary from '../views/Primary/Primary';
import Room from '../views/Room/Room';

const routes = { // Route the client to the appropriate pages for the specified paths
    "/": () => <Primary />,
    "/site/room/:uuid": ({uuid}) => <Room uuid={uuid}/>
};

export default routes;
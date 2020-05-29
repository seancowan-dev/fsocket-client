import React from 'react';
import Primary from '../views/Primary/Primary';
import Modal from '../views/Modal/Modal';
import Room from '../views/Room/Room';

const routes = {
    "/": () => <Primary />,
    "/site/room/modal": () => <Modal />,
    "/site/room/uuid": () => <Room />
};

export default routes;
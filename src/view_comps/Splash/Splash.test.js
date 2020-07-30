import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from "mobx-react";
import DomainStore from '../../DomainStore';
import Splash from './Splash';
import io from "socket.io-client";
import config from '../../config';
const ENDPOINT = config.SOCKET_URL;

jest.mock("socket.io-client", () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

const store = { // Setup the store objects to pass to the rest of the app
    roomStore: DomainStore.roomStore,
    sessionStore: DomainStore.sessionStore,
    uxcStore: DomainStore.uxcStore,
    helpers: DomainStore.helpers
  }

describe('| Site Test Object |', () => {
  
  beforeEach(() => { 
    io.mockClear();
    io().on.mockClear();
    io().emit.mockClear();
  });

  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Provider {...store}><Splash debug /></Provider>);
    expect(component).toMatchSnapshot();
  });
  it('should render correctly in "production" mode', () => {
    const component = shallow(<Provider {...store}><Splash production /></Provider>);
    expect(component).toMatchSnapshot();
  });
});
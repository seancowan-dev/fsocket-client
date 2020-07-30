import React from 'react';
import { shallow } from 'enzyme';
import App from './Site';
import io from "socket.io-client";
import config from './config';
const ENDPOINT = config.SOCKET_URL;

jest.mock("socket.io-client", () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

describe('| Site Test Object |', () => {
  
  beforeEach(() => { 
    io.mockClear();
    io().on.mockClear();
    io().emit.mockClear();
  });

  it('should render correctly in "debug" mode', () => {
    const component = shallow(<App debug />);
    expect(component).toMatchSnapshot();
  });
  it('should render correctly in "production" mode', () => {
    const component = shallow(<App production />);
    expect(component).toMatchSnapshot();
  });
});
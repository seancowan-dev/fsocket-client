import React, { Component } from 'react';
import { observable } from 'mobx';
import { Provider } from "mobx-react";
import ErrorBound from './comps/ErrorBound';
import DomainStore from './DomainStore'
import './App.css';
import './Slide.css';

const store = {
  roomStore: DomainStore.roomStore,
  sessionStore: DomainStore.sessionStore,
  helpers: DomainStore.helpers
}


const App = (props) => {
  
  return(
    <Provider {...store}>
      <ErrorBound>
        {props.routes}
      </ErrorBound>
    </Provider>
    );
};

export default App;

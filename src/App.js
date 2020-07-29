import React from 'react';
import { Provider } from "mobx-react";
import ErrorBound from './comps/ErrorBound';
import DomainStore from './DomainStore'
import './App.css';
import './Slide.css';

const store = { // Setup the store objects to pass to the rest of the app
  roomStore: DomainStore.roomStore,
  sessionStore: DomainStore.sessionStore,
  uxcStore: DomainStore.uxcStore,
  helpers: DomainStore.helpers
}


const App = (props) => {
  
  return(
    <Provider {...store} /* Setup the store */>
      <ErrorBound>
        {props.routes /* Use hookrouter routes */} 
      </ErrorBound>
    </Provider>
    );
};

export default App;

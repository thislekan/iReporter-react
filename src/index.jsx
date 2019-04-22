import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import AppRouter from './routes/index.jsx';
import reduxStore from './store';
import './styles/index.css';

library.add(faCheckCircle, faTimesCircle);
const { store, persistor } = reduxStore;
const MainApp = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);

const appDiv = document.getElementById('app');
ReactDOM.render(<MainApp />, appDiv);

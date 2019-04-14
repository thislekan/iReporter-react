import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import AppRouter from './routes/index.jsx';
import './styles/index.css';

library.add(faCheckCircle, faTimesCircle);
const MainApp = () => (
  <AppRouter />
);

const appDiv = document.getElementById('app');
ReactDOM.render(<MainApp />, appDiv);

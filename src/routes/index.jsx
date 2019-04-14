import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from '../components/HomePage.jsx';
import Header from '../components/Header.jsx';

function AppRouter() {
  return (
    <BrowserRouter>
      <div>
        <Header route={Route}></Header>
        <Switch>
          <Route path='/' component={Homepage} exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;

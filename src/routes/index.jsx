import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from '../components/HomePage.jsx';
import Signup from '../components/Signup.jsx';
import Login from '../components/Login.jsx';
import Header from '../components/Header.jsx';
import UserDashboard from '../components/user/UserDashboard.jsx';

function AppRouter() {
  return (
    <BrowserRouter>
      <div>
        <Header></Header>
        <Switch>
          <Route path='/' component={Homepage} exact />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/user' component={UserDashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;

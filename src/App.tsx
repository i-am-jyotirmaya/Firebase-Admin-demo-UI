import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { AdminAppBar } from './components/AdminAppBar/AdminAppBar';
import Firebase from './services/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, refreshLogin, selectAuthState } from './redux/auth/authSlice';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Routes from './routes/routeConfig';
import RouteConstants from './constants/RouteConstants';
import AdminHome from './components/AdminHome/AdminHome';
import AuthConstants from './constants/AuthConstants';
import { CircularProgress } from '@material-ui/core';
import AppLoader from './components/AppLoader/AppLoader';

const App = () => {

  const dispatch = useDispatch();

  Firebase.auth().onAuthStateChanged((user) => {
    console.warn(user);
    if(user) {
      dispatch(refreshLogin());
    } else {
      dispatch(logout());
    }
  });

  const authState = useSelector(selectAuthState);
  if(authState === AuthConstants.Unknown) {
    return(
      <AppLoader />
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <AdminAppBar />
        <Switch>
          <Routes/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

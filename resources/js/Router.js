import React from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import Home from './views/Home/Home';
import Login from './views/Auth/Login/Login';
import Register from './views/Auth/Register/Register';
import { User_Logout } from './api/User';

const checkAppState = () => {
    const AppState = JSON.parse(localStorage["appState"]);
    return {
        isLoggedIn: AppState.isLoggedIn,
        user: AppState.user,
        hasEmailVerified: AppState.hasEmailVerified
    };
}



const Main = props => (
    <Switch>
        {/*User might LogIn*/}
        <Route exact path='/' component={Home} />
        {/*User will LogIn*/}
        <Route path='/login' >
            {!checkAppState().isLoggedIn ? <Login /> : <Redirect to="/" />}
        </Route>
        <Route path='/register'>
            {!checkAppState().isLoggedIn ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route path='/logout'>
            {checkAppState().isLoggedIn ? <User_Logout /> : <Redirect to="/login" />}
        </Route>
        {/* User is LoggedIn*/}
        {/* <Route path='/email-verify' component={EmailVerify} />
        <Route path='/dashboard'>
            {(checkAppState().hasEmailVerified && checkAppState().isLoggedIn) ? <Dashboard /> : <Redirect to="/" />}
        </Route> */}
        {/*Page Not Found*/}
        {/* <Route path='/not-found' component={NotFound} /> */}
    </Switch>
);
export default Main;

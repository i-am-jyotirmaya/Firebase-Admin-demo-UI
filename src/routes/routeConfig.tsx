import React from 'react';
import { Route } from 'react-router-dom';
import AdminHome from '../components/AdminHome/AdminHome';
import AdminMenu from '../components/AdminMenu/AdminMenu';
import GuardedRoute from '../components/GuardedRoute/GuardedRoute';
import UserProfile from '../components/UserProfile/UserProfile';

import RouteConstants from '../constants/RouteConstants';

const Routes = () => {
    return(
        <React.Fragment>
            <Route exact path={RouteConstants.HOME} component={AdminHome}/>
            <GuardedRoute path={RouteConstants.USER_PROFILE} component={UserProfile}/>
            <GuardedRoute path={RouteConstants.ADMIN_MENU} component={AdminMenu}/>
        </React.Fragment>
    );
}

export default Routes
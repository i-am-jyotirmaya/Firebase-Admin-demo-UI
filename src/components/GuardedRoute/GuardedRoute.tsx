import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
import AuthConstants from '../../constants/AuthConstants';
import { selectAuthState } from '../../redux/auth/authSlice';

// interface IGuardedRouteProps extends RouteProps {
//     authState: AuthConstants
// }

const GuardedRoute: React.FC<RouteProps> = (props): JSX.Element => {
    const authState = useSelector(selectAuthState);
    if(authState !== AuthConstants.Authenticated) {
        return <Redirect to="/"/>
    }
    return(
        <Route {...props}/>
    );
}

export default GuardedRoute;
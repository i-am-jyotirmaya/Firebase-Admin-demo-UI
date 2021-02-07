import { Grow, Menu, MenuItem } from '@material-ui/core';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import RouteConstants from '../../constants/RouteConstants';
import { logoutAsync } from '../../redux/auth/authSlice';

interface IProps {
    anchorEl: null | HTMLElement,
    handleUserMenuClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void
}

const UserMenu: React.FC<IProps> = ({anchorEl, handleUserMenuClose}): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        handleUserMenuClose({}, "backdropClick");
        dispatch(logoutAsync());
    }

    const handleProfile = () => {
        handleUserMenuClose({}, "backdropClick");
        history.push('/profile');
    }

    return(
        <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleUserMenuClose}
                TransitionComponent={Grow}
            >
                {(history.location.pathname !== RouteConstants.USER_PROFILE) && <MenuItem onClick={handleProfile}>Profile</MenuItem>}
                {/* <MenuItem onClick={() => {}}>My account</MenuItem> */}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
    );
}

export default UserMenu;
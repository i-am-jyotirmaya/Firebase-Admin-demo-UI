import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, ButtonGroup, CircularProgress, createStyles, Dialog, DialogContent, DialogTitle, Grow, IconButton, makeStyles, Menu, MenuItem, Theme, Toolbar, Typography } from '@material-ui/core';

import './AdminAppBar.scss';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm/SignupForm';
import { selectAuthState, selectDisplayName } from '../../redux/auth/authSlice';
import { useSelector } from 'react-redux';
import AuthConstants from '../../constants/AuthConstants';
import Emitter from '../../services/eventEmitter';
import UserMenu from '../UserMenu/UserMenu';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1
        }
    })
)

export const AdminAppBar: React.FC = (): JSX.Element => {
    const styles = useStyles();
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [signupModalOpen, setSignupModalOpen] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    useEffect(() => {
        Emitter.on('AUTH_DONE', () => {
            if(loginModalOpen) {
                setLoginModalOpen(false);
            }
            if(signupModalOpen) {
                setSignupModalOpen(false);
            }
        });
        return () => {
            Emitter.off('AUTH_DONE');
        }
    })

    const handleLoginButtonClick = () => {
        if(!loginModalOpen) {
            setLoginModalOpen(true);
        }
    }

    const handleSignupButtonClick = () => {
        if(!signupModalOpen) {
            setSignupModalOpen(true);
        }
    }

    const handleLoginClose = () => {
        setLoginModalOpen(false);
    }

    const handleSignupClose = () => {
        setSignupModalOpen(false);
    }

    const authState = useSelector(selectAuthState);
    const displayName = useSelector(selectDisplayName);

    const handleUserAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleUserMenuClose = () => {
        setAnchorEl(null);
    }

    return(
        <React.Fragment>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography className={styles.title} variant="h6">Firebase Admin Panel</Typography>
                    {(authState === AuthConstants.NotAuthenticated) ? <ButtonGroup variant="text" color="inherit">
                        <Button onClick={handleLoginButtonClick}>Login</Button>
                        <Button onClick={handleSignupButtonClick}>Signup</Button>
                    </ButtonGroup> : (authState === AuthConstants.Unknown) ? <CircularProgress color="secondary" size={24}/> : 
                        <IconButton onClick={handleUserAvatarClick}>
                            <Avatar >{displayName ? displayName[0].toUpperCase() : '?'}</Avatar>
                        </IconButton>}
                </Toolbar>
            </AppBar>
            <Dialog maxWidth="sm" fullWidth={true} open={loginModalOpen} onClose={handleLoginClose} aria-labelledby="login-modal-title" >
                <DialogTitle id="login-modal-title">Login</DialogTitle>
                <DialogContent>
                    <LoginForm />
                </DialogContent>
            </Dialog>
            <Dialog maxWidth="sm" fullWidth={true} open={signupModalOpen} onClose={handleSignupClose} aria-labelledby="signup-modal-title" >
                <DialogTitle id="signup-modal-title">Signup</DialogTitle>
                <DialogContent>
                    <SignupForm />
                </DialogContent>
            </Dialog>
            <UserMenu anchorEl={anchorEl} handleUserMenuClose={handleUserMenuClose}/>
        </React.Fragment>
    );
}
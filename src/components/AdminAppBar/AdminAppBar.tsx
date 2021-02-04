import React, { useState } from 'react';
import { AppBar, Button, ButtonGroup, createStyles, Dialog, DialogContent, DialogTitle, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';

import './AdminAppBar.scss';
import LoginForm from '../LoginForm/LoginForm';

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

    const handleLoginButtonClick = () => {
        if(!loginModalOpen) {
            setLoginModalOpen(true);
        }
    }

    const handleLoginClose = () => {
        setLoginModalOpen(false);
    }

    const handleSignupClose = () => {

    }

    return(
        <React.Fragment>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography className={styles.title} variant="h6">Firebase Admin Panel</Typography>
                    <ButtonGroup variant="text" color="inherit">
                        <Button onClick={handleLoginButtonClick}>Login</Button>
                        <Button>Signup</Button>
                    </ButtonGroup>
                </Toolbar>
            </AppBar>
            <Dialog maxWidth="sm" fullWidth={true} open={loginModalOpen} onClose={handleLoginClose} aria-labelledby="login-modal-title" >
                <DialogTitle id="login-modal-title">Login</DialogTitle>
                <DialogContent>
                    <LoginForm />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
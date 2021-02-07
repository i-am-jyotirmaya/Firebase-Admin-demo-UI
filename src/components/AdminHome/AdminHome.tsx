import React from 'react';
import { Box, Button, Container, createStyles, Icon, makeStyles, Theme, Typography } from '@material-ui/core';

import AdminHomeBg from '../../assets/adminHomeBg.jpg';
import { useSelector } from 'react-redux';
import { selectAuthState, selectIsAdmin } from '../../redux/auth/authSlice';
import AuthConstants from '../../constants/AuthConstants';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        },
        homeImage: {
            maxWidth: '100%'
        },
        homeContainer: { 
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }
    })
);

const AdminHome: React.FC = (): JSX.Element => {
    const styles = useStyles();

    const authState = useSelector(selectAuthState);
    const isAdmin = useSelector(selectIsAdmin);

    return(
        <Box className={styles.root}>
            <Container className={styles.homeContainer} maxWidth="md">
                <Typography color="primary" variant="h1">
                    Firebase Admin Panel
                </Typography>
                {(authState === AuthConstants.Authenticated) && <Button variant="outlined" disabled={!isAdmin} color="primary" size="large" startIcon={<Icon>star</Icon>} endIcon={<Icon>star</Icon>}>
                    Go to Administration
                </Button>}
            </Container>
            <img className={styles.homeImage} src={AdminHomeBg}/>
        </Box>
    );
}

export default AdminHome;
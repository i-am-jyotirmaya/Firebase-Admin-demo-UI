import { Box, CircularProgress, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appLoaderContainer: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            '& .MuiTypography-root': {
                marginTop: theme.spacing(3)
            }
        }
    })
)

const AppLoader: React.FC = (): JSX.Element => {
    const styles = useStyles();

    return(
        <Box className={styles.appLoaderContainer}>
            <CircularProgress size={25}/>
            <Typography color="primary" variant="h6">Please Wait while we load</Typography>
        </Box>
    );
}

export default AppLoader;
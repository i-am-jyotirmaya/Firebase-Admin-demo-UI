import React from 'react';
import { createStyles } from '@material-ui/styles';
import { Box, Button, Icon, makeStyles, Theme, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface IAdminMenuItemProps {
    icon: string,
    title: string,
    to: string
}

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        menuItem: {
            '& div.MuiBox-root': {
                padding: theme.spacing(1),
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                minHeight: 80
            },
        }
    })
)

const AdminMenuItem: React.FC<IAdminMenuItemProps> = ({icon, title, to}): JSX.Element => {
    const styles = useStyles();

    return(
        <React.Fragment>
            <Button className={styles.menuItem} variant="outlined" color="primary" component={Link} to={to}>
                <Box>
                    <Icon>{icon}</Icon>
                    <Typography>{title}</Typography>
                </Box>
            </Button>
        </React.Fragment>
    );
}

export default AdminMenuItem;
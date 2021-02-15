import React, { useState } from 'react';
import { Box, Button, createStyles, Icon, makeStyles, Tab, Tabs, Theme, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AdminMenuItem from '../AdminMenuItem/AdminMenuItem';
import TabPanel from '../TabPanel/TabPanel';
import MultipleUserManagement from '../UserManagement/MultipleUserManagement';

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        indicator: {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            '& > span': {
                maxWidth: 500,
                width: '100%',
                backgroundColor: theme.palette.primary.main
            }
        }
    })
)

const AdminMenu: React.FC = (): JSX.Element => {
    const styles = useStyles();
    const [tabValues, setTabValues] = useState(0);

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValues(newValue);
    }

    return(
        <React.Fragment>
            {/* <AdminMenuItem icon="manage_accounts" title="List Users" to="#" />
            <AdminMenuItem icon="" title="" to="" /> */}
            <Tabs TabIndicatorProps={{children: <span></span>}} classes={{indicator: styles.indicator}} variant="fullWidth" textColor="primary" indicatorColor="primary" value={tabValues} onChange={handleTabChange}>
                <Tab label="Manage multiple users" icon={<Icon>people</Icon>}/>
                <Tab label="Manage a user" icon={<Icon>person</Icon>} />
            </Tabs>
            <TabPanel value={tabValues} index={0} >
                <MultipleUserManagement />
            </TabPanel>
            <TabPanel value={tabValues} index={1} >
                Single User
            </TabPanel>
        </React.Fragment>
    );
}

export default AdminMenu;
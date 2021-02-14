import React, { useState } from 'react';
import { Box, Button, createStyles, Icon, makeStyles, Tab, Tabs, Theme, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AdminMenuItem from '../AdminMenuItem/AdminMenuItem';
import TabPanel from '../TabPanel/TabPanel';

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        
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
            <Tabs variant="fullWidth" textColor="primary" indicatorColor="primary" value={tabValues} onChange={handleTabChange}>
                <Tab label="Manage multiple users" icon={<Icon>people</Icon>}/>
                <Tab label="Manage a user" icon={<Icon>person</Icon>} />
            </Tabs>
            <TabPanel value={tabValues} index={0} >
                All Users
            </TabPanel>
            <TabPanel value={tabValues} index={1} >
                Single User
            </TabPanel>
        </React.Fragment>
    );
}

export default AdminMenu;
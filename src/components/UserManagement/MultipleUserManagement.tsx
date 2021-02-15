import { Container, createStyles, makeStyles, Table, TableHead, TableBody, TableRow, TableCell, TextField, Theme, TableContainer, Paper } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        }
    })
);

const MultipleUserManagement: React.FC = (): JSX.Element => {
    const styles = useStyles();
    
    return(
        <React.Fragment>
            <Container>
                <TextField variant="outlined" fullWidth label="Search username"/>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Is Admin</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </React.Fragment>
    );
}

export default MultipleUserManagement;
import React from "react";
import { Avatar, Box, Button, Container, createStyles, Icon, IconButton, makeStyles, TextField, Theme, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { selectProfileDisplayName, selectProfileEmail } from "../../redux/profile/profileSlice";
// import { selectDisplayName } from "../../redux/auth/authSlice";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        profileContainer: {
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5),
            
        },
        profileHeader: {
            '& .MuiTypography-h3': {
                textDecoration: 'underline'
            },
            '& div.MuiInput-formControl': {
                fontSize: '2em',
                marginRight: theme.spacing(10)
            },
            '& div.MuiInput-formControl>input::placeholder': {
                fontStyle: 'italic'
            }
        }
    })
)

export const UserProfile: React.FC = (): JSX.Element => {
    // const formik = useFormik();
    const displayName = useSelector(selectProfileDisplayName);
    const email = useSelector(selectProfileEmail);
    
    const styles = useStyles();

    return(
        <React.Fragment>
            <Container className={styles.profileContainer} maxWidth="md">
                <Box className={styles.profileHeader}>
                    {displayName ? <Typography variant="h3">
                        {displayName ? displayName : "Add your display name."}
                    </Typography> : 
                    <React.Fragment>
                        <TextField placeholder="Add your display name" size="medium" variant="standard" />
                        <IconButton size="medium" color="primary">
                            <Icon fontSize="large">check</Icon>
                        </IconButton>
                    </React.Fragment>
                    }
                </Box>

            </Container>
        </React.Fragment>
    );
}

export default UserProfile;
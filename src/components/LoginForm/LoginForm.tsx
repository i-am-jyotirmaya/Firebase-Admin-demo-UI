import React from 'react';
import { Button, createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface LoginValues {
    email: string,
    password: string
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        loginForm: {
            '& .MuiTextField-root': {
                marginBottom: theme.spacing(4)
            },
            '& .MuiButton-root': {
                marginBottom: theme.spacing(2)
            }
        }
    })
)

const handleLogin = ({email, password}: LoginValues) => {
    console.log(email, password);
}

const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Kindly provide a valid email!').required('Kindly provide an email!'),
    password: Yup.string().required('Kindly provide a password!')
});



const LoginForm: React.FC = (): JSX.Element => {

    const styles = useStyles();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginValidationSchema,
        // validate: ({password}: LoginValues) => {
        //     const errors: any = {};
        //     if(!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password))
        //         errors.password = `Password doesn't match the minimum criteria.\nShould contain minimum 8 characters.\nShould contain atleast one lowercase alphabet\nShould contain atleast one uppercase alphabet.`
        //     return errors;
        // },
        onSubmit: handleLogin
    });

    return (
        <form className={styles.loginForm} onSubmit={formik.handleSubmit}>
            <TextField
                name="email"
                fullWidth
                label="Email Id"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={(formik.errors.email && formik.touched.email) ? true : false}
                helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
                name="password"
                fullWidth
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={(formik.errors.password && formik.touched.password) ? true : false}
                helperText={formik.touched.password && formik.errors.password}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>Login</Button>
        </form>
    );
}

export default LoginForm;
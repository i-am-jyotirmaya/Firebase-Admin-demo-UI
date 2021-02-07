import React, { useEffect } from 'react';
import { Button, CircularProgress, createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, selectError } from '../../redux/auth/authSlice';

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
            // '& .MuiButton-root': {
            //     marginBottom: theme.spacing(2)
            // }
        },
        buttonWrapper: {
            position: 'relative',
            marginBottom: theme.spacing(2)
        },
        buttonLoading: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12
        }
    })
)

const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Kindly provide a valid email!').required('Kindly provide an email!'),
    password: Yup.string().required('Kindly provide a password!')
});



const LoginForm: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const error = useSelector(selectError);

    useEffect(() => {
        formik.setSubmitting(false);
    }, [error]);

    const styles = useStyles();

    const handleLogin = ({email, password}: LoginValues) => {
        console.log(email, password);
        dispatch(loginAsync(email, password));
    }

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
                error={((formik.errors.email && formik.touched.email) || (error && error === "User not found!")) ? true : false}
                helperText={(error === "User not found!") && error || formik.touched.email && formik.errors.email}
            />
            <TextField
                name="password"
                fullWidth
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={((formik.errors.password && formik.touched.password) || (error && error !== "User not found!")) ? true : false}
                helperText={(error !== "User not found!") && error || formik.touched.password && formik.errors.password}
            />
            <div className={styles.buttonWrapper}>
                <Button disabled={formik.isSubmitting} variant="contained" color="primary" type="submit" fullWidth>Login</Button>
                {formik.isSubmitting && <CircularProgress size={24} className={styles.buttonLoading} />}
            </div>
        </form>
    );
}

export default LoginForm;
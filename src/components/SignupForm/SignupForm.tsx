import { Button, CircularProgress, createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';

interface SignupValues {
    email: string,
    password: string,
    confPassword: string
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        signupForm: {
            '& .MuiTextField-root': {
                marginBottom: theme.spacing(4)
            },
            '& .MuiButton-root': {
                marginBottom: theme.spacing(2)
            }
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

const signupValidationSchema = Yup.object().shape({
    email: Yup.string().email('Kindly provide a valid email!').required('Kindly provide an email!'),
    password: Yup.string().matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, { message: `Password doesn't fulfill minimum criteria.` }).required('Kindly provide a password!'),
    confPassword: Yup.string().required('Provide password again!')
});

const handleSignup = (values: SignupValues) => {
    console.log(values);
}

const SignupForm: React.FC = (): JSX.Element => {

    const styles = useStyles();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confPassword: ''
        },
        validationSchema: signupValidationSchema,
        validate: (values: SignupValues) => {
            const errors: any = {};
            if(values.password !== values.confPassword) {
                errors.confPassword = `Passwords do not match!`;
            }
            return errors;
        },
        onSubmit: handleSignup
    });

    return(
        <form className={styles.signupForm} onSubmit={formik.handleSubmit}>
            <TextField 
                name="email" 
                fullWidth
                label="Email Id"
                type="text" 
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
            <TextField 
                name="confPassword" 
                fullWidth
                label="Confirm Password"
                type="password" 
                value={formik.values.confPassword} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                error={(formik.errors.confPassword && formik.touched.confPassword) ? true : false}
                helperText={formik.touched.confPassword && formik.errors.confPassword}
            />
            <div className={styles.buttonWrapper}>
                <Button disabled={formik.isSubmitting} variant="contained" color="primary" type="submit" fullWidth>
                    Signup
                </Button>
                {formik.isSubmitting && <CircularProgress size={24} className={styles.buttonLoading} />}
            </div>
            
        </form>
    );
}

export default SignupForm;
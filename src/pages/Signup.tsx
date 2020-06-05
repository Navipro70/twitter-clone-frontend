import React, {FC, useState} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Icon from '../images/icon.svg';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from "@material-ui/core/Button";
import * as Yup from 'yup';
import {useFormik} from "formik";
import {ErrorMessage} from "../components/ErrorMessage";
import {usersRoute} from "../api/usersRoute";
import {error, token} from "../types/types";
import {Link, useHistory} from "react-router-dom";
import {useStyles} from "../App";

export const Signup: FC = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState<string>();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            handle: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().trim().email().required('Email is required field'),
            password: Yup.string().trim().min(5, 'Too short').required('Password is required field'),
            confirmPassword: Yup.string().trim().min(5, 'To short').required('Confirm password is required field'),
            handle: Yup.string().trim().min(2, 'Too short').required('This is required field')
        }),
        onSubmit: async (values, formikHelpers) => {
            setLoading(true);
            let data: error | token;
            data = await usersRoute.signUpUser(values);
            if ('general' in data) {
                setLoading(false);
                setGeneralError(data.general);
            }
            else if ('confirmPassword' in data) {
                setLoading(false);
                formikHelpers.setFieldError('confirmPassword', data.confirmPassword!)
            }
            else if ('handle' in data) {
                setLoading(false);
                formikHelpers.setFieldError('handle', data.handle!)
            }
            else if ('email' in data) {
                setLoading(false);
                formikHelpers.setFieldError('email', data.email!)
            }
            else if ('token' in data) {
                setLoading(false);
                const token = data.token; //User Token
                localStorage.setItem('firebaseToken', token!);
                history.push('/');
            }
        }
    });
    const classes = useStyles();
    const {email: emailTouched, password: passwordTouched, confirmPassword: confirmPasswordTouched, handle: handleTouched} = formik.touched;
    const {email: emailError, password: passwordError, confirmPassword: confirmPasswordError, handle: handleError} = formik.errors;
    return (
        <Grid container justify="center" spacing={10}>
            <Grid item xs={12} sm={6}>
                <Paper className={classes.root}>
                    <img style={{width: '50px', marginBottom: '-10px'}} src={Icon} alt="Icon"/>
                    <h2>Sign Up</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            name='email'
                            label="Email*"
                            fullWidth
                            value={formik.values.email}
                            helperText={Boolean(emailTouched && emailError) ? emailError : ''}
                            error={Boolean(emailTouched && emailError)}
                            onChange={formik.handleChange}
                            onFocus={() => formik.setFieldTouched('email', false)}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            name='password'
                            type="password"
                            label="Password*"
                            fullWidth
                            value={formik.values.password}
                            helperText={Boolean(passwordTouched && passwordError) ? passwordError : ''}
                            error={Boolean(passwordTouched && passwordError)}
                            onChange={formik.handleChange}
                            onFocus={() => formik.setFieldTouched('password', false)}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            name='confirmPassword'
                            type='password'
                            label="Confirm password*"
                            fullWidth
                            value={formik.values.confirmPassword}
                            helperText={Boolean(confirmPasswordTouched && confirmPasswordError) ? confirmPasswordError : ''}
                            error={Boolean(confirmPasswordTouched && confirmPasswordError)}
                            onChange={formik.handleChange}
                            onFocus={() => formik.setFieldTouched('confirmPassword', false)}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            name='handle'
                            label="User handle*"
                            fullWidth
                            value={formik.values.handle}
                            helperText={Boolean(handleTouched && handleError) ? handleError : ''}
                            error={Boolean(handleTouched && handleError)}
                            onChange={formik.handleChange}
                            onFocus={() => formik.setFieldTouched('handle', false)}
                            onBlur={formik.handleBlur}
                        />
                        <ErrorMessage error={generalError}
                                      touched={Boolean(passwordTouched &&
                                          emailTouched &&
                                          handleTouched &&
                                          confirmPasswordTouched)}
                        />
                        <div className={classes.submitButton}>
                            <Button disabled={loading} type="submit" variant="contained" color="primary">
                                Sign Up {loading && <CircularProgress size={30} className={classes.progress}/>}
                            </Button>
                        </div>
                    </form>
                    <small>Already have an account? Login
                        <Link to="/login"> here</Link>
                    </small>
                </Paper>
            </Grid>
        </Grid>
    )
};
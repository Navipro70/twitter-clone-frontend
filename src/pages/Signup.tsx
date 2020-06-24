import React, {FC, useEffect} from "react"
import {Link, Redirect, useHistory} from "react-router-dom"
//MUI staff
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import Icon from '../images/icon.svg'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from "@material-ui/core/Button"
import {useStyles} from "../styles/styles"
//Formik stuff
import * as Yup from 'yup'
import {useFormik} from "formik"
import {ErrorMessage} from "../components/ErrorMessage"
//Redux stuff with types
import {useDispatch, useSelector} from "react-redux"
import {thunkSignUp, usersActions} from "../redux/user-reducer"
import {AppStateType} from "../redux/store"

export const Signup: FC = () => {
    const history = useHistory();
    let requireSignUpData = useSelector((state: AppStateType) => ({
        auth: state.usersPage.authenticated,
        sendingData: state.usersPage.sendingData,
        generalError: state.usersPage.generalError
    }));
    let {auth, sendingData, generalError} = requireSignUpData;
    const dispatch = useDispatch();
    const classes = useStyles();
    useEffect(() => {
        return () => {
            dispatch(usersActions.removeGeneralError())
        }
    }, [dispatch]);
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
            dispatch(thunkSignUp(values, formikHelpers.setFieldError, history))
        }
    });
    const {email: emailTouched, password: passwordTouched, confirmPassword: confirmPasswordTouched, handle: handleTouched} = formik.touched;
    const {email: emailError, password: passwordError, confirmPassword: confirmPasswordError, handle: handleError} = formik.errors;
    if (auth) return <Redirect to='/'/>;
    return (
        <Grid container justify="center" spacing={10} style={{margin: 0}}>
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
                            <Button disabled={sendingData} type="submit" variant="contained" color="primary">
                                Sign Up {sendingData && <CircularProgress size={30} className={classes.progress}/>}
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
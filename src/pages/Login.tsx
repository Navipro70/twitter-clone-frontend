import React, {FC, useEffect} from "react"
import {Link, useHistory, Redirect} from "react-router-dom"
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
import {thunkLogin, usersActions} from "../redux/user-reducer"
import {useDispatch, useSelector} from "react-redux"
import {AppStateType} from "../redux/store"

export const Login: FC = () => {
    const history = useHistory();
    let requireLoginData = useSelector((state: AppStateType) => ({
        auth: state.usersPage.authenticated,
        sendingData: state.usersPage.sendingData,
        generalError: state.usersPage.generalError
    }));
    let {auth, sendingData, generalError} = requireLoginData;
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email().required('Email is required field'),
            password: Yup.string().min(5, 'Too short').required('Password is required field'),
        }),
        onSubmit: (values) => {
            dispatch(thunkLogin(values, history))
        }
    });
    const classes = useStyles();
    useEffect(() => {
        return () => {
            dispatch(usersActions.removeGeneralError())
        }
    }, [dispatch]);
    const {email: emailTouched, password: passwordTouched} = formik.touched;
    const {email: emailError, password: passwordError} = formik.errors;
    if (auth) return <Redirect to='/'/>;
    return (
        <Grid container justify="center" spacing={10} style={{margin: 0}}>
            <Grid item xs={12} sm={6}>
                <Paper className={classes.root}>
                    <img style={{width: '50px', marginBottom: '-10px'}} src={Icon} alt="Icon"/>
                    <h2>Login</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
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
                        </div>
                        <div>
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
                            <ErrorMessage error={generalError} touched={Boolean(passwordTouched && emailTouched)}/>
                        </div>
                        <div className={classes.submitButton}>
                            <Button disabled={sendingData} type="submit" variant="contained" color="primary">
                                Login {sendingData && <CircularProgress size={30} className={classes.progress}/>}
                            </Button>
                        </div>
                    </form>
                    <small>Don't have an account? Sign up
                        <Link to="/signup"> here</Link>
                    </small>
                </Paper>
            </Grid>
        </Grid>
    )
};
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
import {Link, useHistory} from "react-router-dom";
import {useStyles} from "../styles/styles";
import {thunkLogin} from "../redux/user-reducer";
import {useDispatch} from "react-redux";

export const Login: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState<string>();
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
            dispatch(thunkLogin(values, setLoading, setGeneralError, history))
        }
    });
    const classes = useStyles();
    const {email: emailTouched, password: passwordTouched} = formik.touched;
    const {email: emailError, password: passwordError} = formik.errors;
    return (
        <Grid container justify="center" spacing={10}>
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
                            <Button disabled={loading} type="submit" variant="contained" color="primary">
                                Login {loading && <CircularProgress size={30} className={classes.progress}/>}
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
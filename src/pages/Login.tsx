import React, {FC} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Icon from '../images/icon.svg';
import {makeStyles} from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import * as Yup from 'yup';
import {Form, FormikProps, withFormik} from "formik";
import {ErrorMessage} from "../components/ErrorMessage";
import {usersRoute} from '../api/usersRoute';

type TFormik = {
    email: string
    password: string
}

const useStyles = makeStyles({
    root: {
        padding: '15px',
        textAlign: 'center',
    },
    submitButton: {
        marginTop: '15px'
    }
});

const Login: FC<FormikProps<TFormik>> = ({errors, values, handleChange, setFieldTouched, handleBlur, touched}) => {
    const classes = useStyles();
    const {email: emailTouched, password: passwordTouched} = touched;
    const {email: emailError, password: passwordError} = errors;
    return (
        <Grid container justify="center" spacing={10}>
            <Grid item xs={12} sm={6}>
                <Paper className={classes.root}>
                    <img style={{width: '50px'}} src={Icon} alt="Icon"/>
                    <h2>Login</h2>
                    <Form>
                        <div>
                            <TextField
                                name='email'
                                label="Email*"
                                fullWidth
                                value={values.email}
                                error={Boolean(emailTouched && emailError)}
                                onChange={handleChange}
                                onFocus={() => setFieldTouched('email', false)}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage touched={emailTouched} error={emailError}/>
                        <div>
                            <TextField
                                name='password'
                                type="password"
                                label="Password*"
                                fullWidth
                                value={values.password}
                                error={Boolean(passwordTouched && passwordError)}
                                onChange={handleChange}
                                onFocus={() => setFieldTouched('password', false)}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage touched={passwordTouched} error={passwordError}/>
                        <div className={classes.submitButton}>
                            <Button type="submit" variant="contained" color="primary">Login</Button>
                        </div>
                    </Form>
                </Paper>
            </Grid>
        </Grid>
    )
};

export const LoginFormik = withFormik<TFormik, TFormik>({
    mapPropsToValues: ({email, password}) => ({
        email: '',
        password: ''
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().min(5, 'Too short').required('Required'),
    }),
    handleSubmit: async(values) => {
            const token = await usersRoute.loginUser(values);
            console.log(token)
    }
})(Login);
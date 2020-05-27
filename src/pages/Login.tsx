import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Icon from '../images/icon.svg';

export const Login = () => {
    return (
        <Grid container justify="center" spacing={10}>
            <Grid item xs={12} sm={6}>
                <Paper>
                    <img style={{width: '50px'}} src={Icon} alt=""/>
                    <TextField id="standard-basic" label="Standard"/>
                </Paper>
            </Grid>
        </Grid>
    )
};
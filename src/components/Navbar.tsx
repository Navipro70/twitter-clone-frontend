import React, {FC} from "react";
//MUI staff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
//Redux stuff and types
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import {thunkLogoutUser} from "../redux/user-reducer";

export const Navbar: FC = () => {
    const authenticated = useSelector<AppStateType>(state => {
        return state.usersPage.authenticated
    });
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(thunkLogoutUser())
    };
    return (
        <AppBar>
            <Toolbar className="nav-container">
                <Button color="inherit" component={Link} to='/'>Home</Button>
                {
                    !authenticated &&
                    <>
                        <Button color="inherit" component={Link} to='/login'>Login</Button>
                        <Button color="inherit" component={Link} to='/signup'>Signup</Button>
                    </>
                }
                {
                    authenticated &&
                    <Button color="inherit" component={Link} to='/' onClick={handleLogout}>Logout</Button>
                }
            </Toolbar>
        </AppBar>
    )
};
import React, {useEffect} from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import jwtDecode from 'jwt-decode'
import {Home} from "./pages/Home"
import {Login} from "./pages/Login"
import {Signup} from "./pages/Signup"
import {Navbar} from "./components/Navbar"
import {thunkGetAuthenticatedUserData, thunkLogoutUser, usersActions} from './redux/user-reducer'
import {useDispatch} from 'react-redux'
import {axiosInstance} from "./api/axiosInstance";

const App = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('firebaseToken');
    useEffect(() => {
        if (token) {
            const decodedToken: any = jwtDecode(token);
            console.log(decodedToken.exp * 1000 < Date.now());
            if (decodedToken.exp * 1000 < Date.now()) {
                dispatch(thunkLogoutUser())
            } else {
                dispatch(usersActions.setAuthenticated());
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                dispatch(thunkGetAuthenticatedUserData())
            }
        }
    }, [token, dispatch]);
    return (
        <Router>
            <Navbar/>
            <div className="container">
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={Signup}/>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import './App.css';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Home} from "./pages/Home";
import {Login} from "./pages/Login";
import {Signup} from "./pages/Signup";
import {Navbar} from "./components/Navbar";
import jwtDecode from 'jwt-decode';
import {theme} from "./styles/styles";

//TODO remove this check to redux and implement redux state
const token = localStorage.getItem('firebaseToken');
let authonticated: boolean;
if (token) {
    const decodedToken = jwtDecode(token);
    // @ts-ignore
    if (decodedToken.exp * 1000 < Date.now()) {
        // window.location.href = '/login';
        authonticated = false
    } else {
        authonticated = true;
    }
}

const App = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
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
            </Provider>
        </MuiThemeProvider>
    );
};

export default App;
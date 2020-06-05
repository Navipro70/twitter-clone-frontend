import React from 'react';
import './App.css';
import {MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Home} from "./pages/Home";
import {Login} from "./pages/Login";
import {Signup} from "./pages/Signup";
import {Navbar} from "./components/Navbar";
import {makeStyles} from "@material-ui/styles";
import jwtDecode from 'jwt-decode';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#33c9dc',
            main: '#00bcd4',
            dark: '#008394',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff6333',
            main: '#ff3d00',
            dark: '#b22a00',
            contrastText: '#fff',
        }
    }
});

export const useStyles = makeStyles({
    root: {
        padding: '15px',
        textAlign: 'center',
    },
    submitButton: {
        position: 'relative',
        marginTop: '15px',
        marginBottom: '10px'
    },
    progress: {
        position: 'absolute'
    }
});

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
        </MuiThemeProvider>
    );
};

export default App;
import React from 'react';
import './App.css';
import {MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Home} from "./pages/Home";
import {Login} from "./pages/Login";
import {Signup} from "./pages/Signup";
import {Navbar} from "./components/Navbar";

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

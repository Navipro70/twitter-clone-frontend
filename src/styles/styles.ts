import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {makeStyles} from "@material-ui/styles";

export const theme = createMuiTheme({
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
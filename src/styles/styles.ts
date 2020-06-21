import {createMuiTheme} from "@material-ui/core/styles";
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
    },
    profileBlock: {
        marginTop: '20px',
        minHeight: '47vh',
        padding: '10px',
        textAlign: 'center',
        '& img': {
            height: '150px',
            width: '150px',
            borderRadius: '100%'
        },
        '& a': {
            display: 'block',
            fontSize: '20px',
            color: '#33c9dc',
        },
        '& *': {
            margin: '3px',
            verticalAlign: 'middle',
        }
    },
    homeProgress:
        {
            display: 'block',
            marginTop: '30px',
            marginLeft: 'auto',
            marginRight: 'auto'
        }
});
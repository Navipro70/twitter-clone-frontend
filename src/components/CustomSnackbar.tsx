import React, {FC, useEffect, useState} from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {useDispatch} from "react-redux";
import {usersActions} from "../redux/user-reducer";
type TProps = {
    message: string
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const CustomSnackbar: FC<TProps> = ({message}) => {
    let initialValue = message !== '';
    const [open, setOpen] = useState<boolean>(initialValue);
    const dispatch = useDispatch();
    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false)
        }, 6000);
        return () => {
            dispatch(usersActions.removeGeneralError());
            clearTimeout(timer)
        }
    }, [open, dispatch]);
    return (
        <Snackbar open={open} onClick={() => setOpen(false)}>
            <Alert severity="warning">
                {message}
            </Alert>
        </Snackbar>
    )
};
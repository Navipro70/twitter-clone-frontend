import React, {FC} from "react";
import Snackbar from '@material-ui/core/Snackbar';
//TODO finish custom snackbar
type TProps = {
    message: 'string'
}

export const CustomSnackbar: FC<TProps> = ({message}) => {
    return (
        <Snackbar
            message={message}
        />
    )
};
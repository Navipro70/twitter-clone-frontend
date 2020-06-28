import React, {FC} from "react";
import Modal from "@material-ui/core/Modal";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {useStyles} from "../styles/styles";

interface IProps {
    open: boolean,
    handleClose: () => void
}

export const EditProfileModal: FC<IProps> = ({open, handleClose}) => {
    const classes = useStyles();
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="transition-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modalStyle}
        >
            <Fade in={open}>
                <Paper className={classes.paperStyle}>
                    <Input placeholder="Your name"/>
                </Paper>
            </Fade>
        </Modal>
    )
};
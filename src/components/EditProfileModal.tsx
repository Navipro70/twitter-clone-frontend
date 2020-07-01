import React, {FC} from "react";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {useStyles} from "../styles/styles";
import Button from "@material-ui/core/Button";

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
                    <form className={classes.modalForm} noValidate autoComplete="off">
                        <h4>Add information about you</h4>
                        <TextField label="Bio" />
                        <TextField label="Website" />
                        <TextField label="Location" />
                        <Button variant="contained" color="primary">
                            Change
                        </Button>
                    </form>
                </Paper>
            </Fade>
        </Modal>
    )
};
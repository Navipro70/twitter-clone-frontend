import React, {FC} from "react";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {useStyles} from "../styles/styles";
import Button from "@material-ui/core/Button";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {thunkAddUserDetails} from "../redux/user-reducer";
import {AppStateType} from "../redux/store";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

interface IProps {
    open: boolean,
    handleClose: () => void
}

export const EditProfileModal: FC<IProps> = ({open, handleClose}) => {
    const classes = useStyles();
    const sendingUserDetails = useSelector((state: AppStateType) => state.usersPage.postingUserDetails);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            bio: '',
            website: '',
            location: ''
        },
        validationSchema: Yup.object().shape({
            bio: Yup.string().min(2, 'Too short').max(300, 'Too long'),
            website: Yup.string().min(2, 'Too short').max(300, 'Too long'),
            location: Yup.string().min(2, 'Too short').max(300, 'Too long')
        }),
        onSubmit: async (values) => {
            dispatch(thunkAddUserDetails(values, handleClose))
        }
    });
    const {bio: bioError, website: websiteError, location: locationError} = formik.errors;
    const {bio: bioTouched, website: websiteTouched, location: locationTouched} = formik.errors;
    const setFieldUntouched = (field: string) => () => formik.setFieldTouched(field, false);
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
                    <form onSubmit={formik.handleSubmit} className={classes.modalForm} noValidate autoComplete="off">
                        <h4>Add information about you</h4>
                        <TextField
                            label="Bio"
                            name="bio"
                            onChange={formik.handleChange}
                            value={formik.values.bio}
                            helperText={Boolean(bioTouched && bioError) ? bioError : ''}
                            error={Boolean(bioTouched && bioError)}
                            onFocus={setFieldUntouched('bio')}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            label="Website"
                            name="website"
                            onChange={formik.handleChange}
                            value={formik.values.website}
                            helperText={Boolean(websiteTouched && websiteError) ? websiteError : ''}
                            error={Boolean(websiteTouched && websiteError)}
                            onFocus={setFieldUntouched('website')}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            label="Location"
                            name="location"
                            onChange={formik.handleChange}
                            value={formik.values.location}
                            helperText={Boolean(locationTouched && locationError) ? locationError : ''}
                            error={Boolean(locationTouched && locationError)}
                            onFocus={setFieldUntouched('location')}
                            onBlur={formik.handleBlur}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type='submit'
                            disabled={sendingUserDetails}
                        >
                            Change {sendingUserDetails && <CircularProgress size={30} className={classes.progress}/>}
                        </Button>
                    </form>
                </Paper>
            </Fade>
        </Modal>
    )
};
import React, {useState} from "react"
import TextField from '@material-ui/core/TextField'
import Button from "@material-ui/core/Button"
import { thunkAddPost } from "../redux/posts-reducer"
import {useDispatch, useSelector} from "react-redux"
import {AppStateType} from "../redux/store"
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress"

export const AddingPost = () => {
    const dispatch = useDispatch();
    const stateData = useSelector((state: AppStateType) => ({
        error: state.postsPage.error,
        sendingPost: state.postsPage.sendingPost
    }));
    const {error, sendingPost} = stateData;
    const [postText, setText] = useState('');
    const handleSubmit = () => {
        dispatch(thunkAddPost(postText, setText))
    };
    return (
        <div style={{
            display: "flex",
            flexDirection: "column"
        }}>
            <TextField
                label="Have some news? Share with other!"
                multiline
                rowsMax={14}
                rows={8}
                variant="outlined"
                type="text"
                value={postText}
                onChange={(e) => setText(e.target.value)}
                error={Boolean(error)}
                helperText={error}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={(postText === "") || (postText.length > 1000)}>
                Post {sendingPost && <CircularProgress size={30} style={{position: 'absolute', color: 'white'}}/>}
            </Button>
        </div>
    )
};
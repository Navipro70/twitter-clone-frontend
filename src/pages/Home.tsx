import React, {useEffect} from "react"
import '../App.css'
import {Grid} from "@material-ui/core"
import {Post} from "../components/Post"
import {thunkAuthentication} from "../redux/posts-reducer"
import {useDispatch, useSelector} from "react-redux"
import {AppStateType} from "../redux/store"
import {Profile} from "../components/Profile";
import Paper from "@material-ui/core/Paper/Paper";
import {useStyles} from "../styles/styles";

export const Home = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const posts = useSelector((state: AppStateType) => state.postsPage.posts);
    useEffect(() => {
        dispatch(thunkAuthentication())
    }, [dispatch]);
    return (
        <Grid container spacing={8}>
            <Grid item xs={12} sm={8}>
                {
                    posts !== null
                        ?
                        posts.map((post: any) => <Post key={post.postId} post={post}/>)
                        :
                        <p>...Loading</p>
                }
            </Grid>
            <Grid item xs={12} sm={4}>
                <Paper className={classes.profileBlock}>
                    <Profile />
                </Paper>
            </Grid>
        </Grid>
    )
};
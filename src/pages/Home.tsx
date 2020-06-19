import React, {useEffect} from "react"
import '../App.css'
import Grid from "@material-ui/core/Grid"
import {Post} from "../components/Post"
import {thunkFetchPosts} from "../redux/posts-reducer"
import {useDispatch, useSelector} from "react-redux"
import {AppStateType} from "../redux/store"
import {Profile} from "../components/Profile"
import Paper from "@material-ui/core/Paper/Paper"
import {useStyles} from "../styles/styles"
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress"
import {AddingPost} from "../components/AddingPost"

export const Home = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const postsAndAuth = useSelector((state: AppStateType) => ({
        postsPage: state.postsPage,
        authenticated: state.usersPage.authenticated
    }));
    const {fetchingPosts, posts} = postsAndAuth.postsPage;
    useEffect(() => {
        dispatch(thunkFetchPosts())
    }, [dispatch]);

    return (
        <Grid container spacing={4} style={{margin: 0}}>
            <Grid item xs={12} sm={4}>
                <Paper className={classes.profileBlock}>
                    <Profile/>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
                {postsAndAuth.authenticated && <AddingPost/>}
                {
                    fetchingPosts
                        ?
                        <CircularProgress size={50} style={{
                            display: 'block',
                            marginTop: '30px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}/>
                        :
                        posts.length !== 0
                            ?
                            posts.map(post => <Post key={post.postId} post={post}/>)
                            :
                            <Paper className={classes.profileBlock}>
                                <h3>There is no posts here</h3>
                            </Paper>
                }
            </Grid>
        </Grid>
    )
};
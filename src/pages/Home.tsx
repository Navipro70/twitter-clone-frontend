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
import {CustomSnackbar} from "../components/CustomSnackbar";

export const Home = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const postsAndAuth = useSelector((state: AppStateType) => ({
        postsPage: state.postsPage,
        usersPage: {
            authenticated: state.usersPage.authenticated,
            generalError: state.usersPage.generalError
        }
    }));
    const {fetchingPosts, posts} = postsAndAuth.postsPage;
    const {authenticated, generalError} = postsAndAuth.usersPage;
    useEffect(() => {
        dispatch(thunkFetchPosts());
    }, [dispatch]);
    return (
        <Grid container spacing={4} style={{margin: 0}}>
            <Grid item xs={12} sm={4}>
                <Paper className={classes.profileBlock}>
                    <Profile/>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
                {authenticated && <AddingPost/>}
                {
                    fetchingPosts
                        ?
                        <CircularProgress size={50} className={classes.homeProgress}/>
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
            {generalError && <CustomSnackbar message={generalError} />}
        </Grid>
    )
};
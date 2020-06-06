import React, {useEffect} from "react";
import {Grid} from "@material-ui/core";
import {Post} from "../components/Post";
import {thunkAuthentication} from "../redux/posts-reducer";
import {useDispatch, useSelector} from "react-redux";

export const Home = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const posts = useSelector(state => state.postsPage.posts);
    useEffect(() => {
        dispatch(thunkAuthentication())
    }, []);
    return (
        <Grid container spacing={8}>
            <Grid item xs={12} sm={8}>
                {(posts !== null) ?
                    posts.map((post: any) => <Post key={post.postId} post={post}/>)
                    :
                    <p>...Loading</p>}
            </Grid>
            <Grid item xs={12} sm={4}>
                <p>Profile</p>
            </Grid>
        </Grid>
    )
};
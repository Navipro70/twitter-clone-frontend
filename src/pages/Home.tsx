import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import {postsRoute} from "../api/postsRoute";
import {ArrayOfTPosts} from "../types/types";
import {Post} from "../components/Post";

export const Home = () => {
    const [posts, setPosts] = useState<ArrayOfTPosts | null>(null);
    useEffect(() => {
        postsRoute.getAllPosts().then(posts => {
            setPosts(posts as ArrayOfTPosts);
        });
    }, []);
    return (
        <Grid container spacing={8}>
            <Grid item xs={12} sm={8}>
                {(posts !== null) ?
                    posts.map(post => <Post key={post.postId} post={post}/>)
                    :
                    <p>...Loading</p>}
            </Grid>
            <Grid item xs={12} sm={4}>
                <p>Profile</p>
            </Grid>
        </Grid>
    )
};
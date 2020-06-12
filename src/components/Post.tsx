import React, {FC} from "react";
import {TPost} from "../types/types";
import relativeTime from 'dayjs/plugin/relativeTime';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import {Link} from "react-router-dom";
import dayjs from "dayjs";

type TProps = {
    post: TPost
}

export const Post: FC<TProps> = ({post}) => {
    const {userHandle, userImage, postText, timestamp} = post;
    dayjs.extend(relativeTime);
    return (
        <Card style={{marginTop: '20px'}}>
            <CardHeader
                avatar={
                    <Link to={`/user/${userHandle}`}>
                        <Avatar src={userImage}/>
                    </Link>
                }
                title={
                    <Link to={`/user/${userHandle}`}
                          children={userHandle}/>
                }
                subheader={dayjs(timestamp).fromNow()}/>
            <CardContent>
                <Typography variant="body1">{postText}</Typography>
            </CardContent>
        </Card>
    )
};
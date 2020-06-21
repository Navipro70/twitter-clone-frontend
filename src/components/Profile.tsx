import React, {FC} from "react"
import "../App.css"
import {Link} from "react-router-dom"
// redux stuff
import {useDispatch, useSelector} from "react-redux"
import {AppStateType} from "../redux/store"
//MUI stuff
import LocationOnIcon from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress"
import Tooltip from '@material-ui/core/Tooltip'
// dayjs stuff
import dayjs from "dayjs"
import {thunkUploadImage} from "../redux/user-reducer";
//TODO Make UI for uploading image better
//TODO Add error handler with Snackbar
//TODO make refresh posts when upload image
export const Profile: FC = () => {
    const dispatch = useDispatch();
    const profileData = useSelector((state: AppStateType) => ({
        credentials: state.usersPage.credentials,
        fetchingProfile: state.usersPage.fetchingProfile
    }));
    const handleUpload = (e: any) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file, file.name);
        dispatch(thunkUploadImage(formData))
    };
    const {credentials, fetchingProfile} = profileData;
    if (fetchingProfile) return <CircularProgress size={30}/>;
    if (JSON.stringify(credentials) === '{}') {
        return (
            <h3>Not logged yet? Go <Link to='/login'>there</Link></h3>
        )
    }
    return (
        <>
            <div>
                <input
                    type="file"
                    id="upload-image"
                    style={{display: 'none'}}
                    onChange={handleUpload}
                />
                <label htmlFor="upload-image">
                <Tooltip title="Upload image">
                        <img
                            src={credentials.imageUrl}
                            alt="profile"
                            className={'profile-image-upload'}
                        />
                </Tooltip>
                </label>

            </div>
            <Link to={`/user/${credentials.handle}`}>{`@${credentials.handle}`}</Link>
            {credentials.bio &&
            <p>
                {credentials.bio}
            </p>}
            {credentials.location &&
            <div>
                <LocationOnIcon color='primary'/>
                <span>{credentials.location}</span>
            </div>}
            {credentials.website &&
            <div>
                <LinkIcon color='primary'/>
                <a href={credentials.website}
                   style={{fontSize: '15px', display: 'inline-block'}}>{credentials.website}</a>
            </div>
            }
            <div>
                <CalendarTodayIcon color='primary'/>
                <span>Joined at {dayjs(credentials.timestamp).format('MMM YYYY')}</span>
            </div>
        </>
    )
};
import React, {FC} from "react"
import {useSelector} from "react-redux"
import {AppStateType} from "../redux/store"
import {Link} from "react-router-dom"
import LocationOnIcon from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import dayjs from "dayjs"
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

export const Profile: FC = () => {
    const profileData = useSelector((state: AppStateType) => ({
        credentials: state.usersPage.credentials,
        fetchingProfile: state.usersPage.fetchingProfile
    }));
    const {credentials, fetchingProfile} = profileData;
    if (fetchingProfile) return <CircularProgress size={30}/>;
    if (JSON.stringify(credentials) === '{}') {
        return (
            <h3>Not logged yet? Go <Link to='/login'>there</Link></h3>
        )
    }
    return (
        <>
            <img src={credentials.imageUrl} alt="profile"/>
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
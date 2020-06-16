import React, {FC} from "react"
import {TCredentials} from "../types/types"
import {useSelector} from "react-redux"
import {AppStateType} from "../redux/store"
import {Link} from "react-router-dom"
import LocationOnIcon from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import dayjs from "dayjs"

//TODO fix theme

export const Profile: FC = () => {
    const credentials: TCredentials = useSelector((state: AppStateType) => state.usersPage.credentials);
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
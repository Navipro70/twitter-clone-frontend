import {AppStateType, InferActionsType} from "./store";
import {ThunkAction} from "redux-thunk";
import {
    error,
    TArrayOfLikes,
    TArrayOfNotifications,
    TCredentials,
    TLoginUser,
    token,
    TSignUp,
    TUserDetails
} from '../types/types'
import {usersRoute} from "../api/usersRoute";
import {axiosInstance} from "../api/axiosInstance";

let initialState = {
    authenticated: false,
    sendingData: false,
    fetchingProfile: false,
    postingUserDetails: false,
    generalError: '' as string,
    credentials: {} as TCredentials,
    likes: [] as TArrayOfLikes,
    notifications: [] as TArrayOfNotifications
};

type initialStateType = typeof initialState
type ActionType = InferActionsType<typeof usersActions>

export const userReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "SET_AUTHENTICATED":
            return {
                ...state,
                authenticated: true
            };
        case "SET_UNAUTHENTICATED":
            return {
                ...initialState
            };
        case "SET_AUTHENTICATED_USER_DATA":
            return {
                ...state,
                authenticated: true,
                ...action.payload
            };
        case "SET_GENERAL_ERROR":
            return {
                ...state,
                generalError: action.generalError
            };
        case "REMOVE_GENERAL_ERROR":
            return {
                ...state,
                generalError: ''
            };
        case "START_SENDING_DATA":
            return {
                ...state,
                sendingData: true
            };
        case "STOP_SENDING_DATA":
            return {
                ...state,
                sendingData: false
            };
        case "START_FETCHING_PROFILE":
            return {
                ...state,
                fetchingProfile: true
            };
        case "STOP_FETCHING_PROFILE":
            return {
                ...state,
                fetchingProfile: false
            };
        case "START_POSTING_USER_DETAILS":
            return {
                ...state,
                postingUserDetails: true
            };
        case "STOP_POSTING_USER_DETAILS":
            return {
                ...state,
                postingUserDetails: false
            };
        default:
            return {...state}
    }
};

export const usersActions = {
    setAuthenticated: () => ({
        type: 'SET_AUTHENTICATED',
    } as const),
    setUnathenticated: () => ({
        type: 'SET_UNAUTHENTICATED'
    } as const),
    setAuthenticatedUserData: (payload: any) => ({
        type: 'SET_AUTHENTICATED_USER_DATA',
        payload
    } as const),
    startSendingUserData: () => ({
        type: 'START_SENDING_DATA'
    } as const),
    stopSendingUserData: () => ({
        type: 'STOP_SENDING_DATA'
    } as const),
    setGeneralError: (generalError: string) => ({
        type: 'SET_GENERAL_ERROR',
        generalError
    } as const),
    removeGeneralError: () => ({
        type: 'REMOVE_GENERAL_ERROR'
    } as const),
    startFetchingProfile: () => ({
        type: 'START_FETCHING_PROFILE'
    } as const),
    stopFetchingProfile: () => ({
        type: 'STOP_FETCHING_PROFILE'
    } as const),
    starPostingUserDetails: () => ({
        type: 'START_POSTING_USER_DETAILS'
    } as const),
    stopPostingUserDetails: () => ({
        type: 'STOP_POSTING_USER_DETAILS'
    } as const)
};

export type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

//------------AUTHORIZATION_THUNKS-----------------------------

export const thunkLogin = (
    loginValues: TLoginUser,
    history: any
): ThunkActionType => async dispatch => {
    try {
        dispatch(usersActions.startSendingUserData());
        let data: token | error;
        data = await usersRoute.loginUser(loginValues);
        if ('general' in data) {
            dispatch(usersActions.setGeneralError(data.general!));
        } else if ('token' in data) {
            dispatch(usersActions.setAuthenticated());
            dispatch(usersActions.removeGeneralError());
            const token = data.token; //User Token
            localStorage.setItem('firebaseToken', token);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await dispatch(thunkGetAuthenticatedUserData());
            history.push('/');
        }
    } catch (err) {
        console.error(err)
    } finally {
        dispatch(usersActions.stopSendingUserData());
    }
};

export const thunkSignUp = (
    values: TSignUp,
    setFieldError: (field: string, error: string) => void,
    history: any
): ThunkActionType => async dispatch => {
    try {
        dispatch(usersActions.startSendingUserData());
        let data: error | token;
        data = await usersRoute.signUpUser(values);
        if ('general' in data) dispatch(usersActions.setGeneralError(data.general!));
        else if ('confirmPassword' in data) setFieldError('confirmPassword', data.confirmPassword!);
        else if ('handle' in data) setFieldError('handle', data.handle!);
        else if ('email' in data) setFieldError('email', data.email!);
        else if ('token' in data) {
            dispatch(usersActions.setAuthenticated());
            const token = data.token; //User Token
            localStorage.setItem('firebaseToken', token);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await dispatch(thunkGetAuthenticatedUserData());
            dispatch(usersActions.removeGeneralError());
            history.push('/');
        }
    } catch (err) {
        console.error(err)
    } finally {
        dispatch(usersActions.stopSendingUserData());
    }
};

export const thunkGetAuthenticatedUserData = (): ThunkActionType => async dispatch => {
    try {
        dispatch(usersActions.startFetchingProfile());
        const data = await usersRoute.getAuthenticatedUserData();
        dispatch(usersActions.setAuthenticatedUserData(data));
    } catch (err) {
        console.error(err)
    } finally {
        dispatch(usersActions.stopFetchingProfile())
    }
};

export const thunkLogoutUser = (): ThunkActionType => async dispatch => {
    dispatch(usersActions.setUnathenticated());
    localStorage.removeItem('firebaseToken');
};

//---------------------------------------------------------------------

//-------------------CHANGING-PROFILE-THUNKS---------------------------

export const thunkUploadImage = (formData: FormData): ThunkActionType => async dispatch => {
    try {
        await usersRoute.uploadImage(formData);
        await dispatch(thunkGetAuthenticatedUserData());
    } catch (err) {
        console.error(err);
        dispatch(usersActions.setGeneralError(err.response.data.error))
    }
};

export const thunkAddUserDetails = (userDetails: TUserDetails, handleClose: () => void):ThunkActionType => async dispatch => {
    try {
        dispatch(usersActions.starPostingUserDetails());
        await usersRoute.addUserDetails(userDetails);
        handleClose();
        await dispatch(thunkGetAuthenticatedUserData())
    } catch (err) {
        console.error(err);
        dispatch(usersActions.setGeneralError(err.response.data.error))
    } finally {
        dispatch(usersActions.stopPostingUserDetails());
    }
};
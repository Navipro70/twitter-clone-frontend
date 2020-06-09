import {AppStateType, InferActionsType} from "./store";
import {ThunkAction} from "redux-thunk";
import {error, TLoginUser, token, TSignUp} from '../types/types'
import {usersRoute} from "../api/usersRoute";
import {axiosInstance} from "../api/axiosInstance";

let initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: []
};

type initialStateType = typeof initialState
type ActionType = InferActionsType<typeof actions>

export const userReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "SET_AUTHENTICATED":
            return {
                ...state,
                authenticated: true
            };
        case "SET_UNAUTHENTICATED":
            return initialState;
        case "SET_AUTHENTICATED_USER_DATA":
            return {
                authenticated: true,
                ...action.payload
            };
        default:
            return {...state}
    }
};

const actions = {
    setAuthenticated: () => ({
        type: 'SET_AUTHENTICATED',
    } as const),
    setUnathenticated: () => ({
        type: 'SET_UNAUTHENTICATED'
    } as const),
    setAuthenticatedUserData: (payload: any) => ({
        type: 'SET_AUTHENTICATED_USER_DATA',
        payload
    } as const)
};

export type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

export const thunkLogin = (loginValues: TLoginUser,
                           setLoading: (bool: boolean) => void,
                           setGeneralError: (generalError: string) => void,
                           history: any
): ThunkActionType => async (dispatch) => {
    setLoading(true);
    let data: token | error;
    data = await usersRoute.loginUser(loginValues);
    if ('general' in data) {
        setLoading(false);
        setGeneralError(data.general!);
    } else if ('token' in data) {
        setLoading(false);
        dispatch(actions.setAuthenticated());
        const token = data.token; //User Token
        localStorage.setItem('firebaseToken', token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await dispatch(thunkGetAuthenticatedUserData());
        history.push('/');
    }
};

export const thunkSignUp = (values: TSignUp,
                            setLoading: (isLoading: boolean) => void,
                            setGeneralError: (generalError: string) => void,
                            setFieldError: (field: string, error: string) => void,
                            history: any
): ThunkActionType => async (dispatch) => {
    setLoading(true);
    let data: error | token;
    data = await usersRoute.signUpUser(values);
    if ('general' in data) {
        setLoading(false);
        setGeneralError(data.general!);
    } else if ('confirmPassword' in data) {
        setLoading(false);
        setFieldError('confirmPassword', data.confirmPassword!)
    } else if ('handle' in data) {
        setLoading(false);
        setFieldError('handle', data.handle!)
    } else if ('email' in data) {
        setLoading(false);
        setFieldError('email', data.email!)
    } else if ('token' in data) {
        setLoading(false);
        dispatch(actions.setAuthenticated());
        const token = data.token; //User Token
        localStorage.setItem('firebaseToken', token);
        await dispatch(thunkGetAuthenticatedUserData());
        history.push('/');
    }
};

export const thunkGetAuthenticatedUserData = (): ThunkActionType => async (dispatch) => {
    try {
        const data = await usersRoute.getAuthenticatedUserData();
        dispatch(actions.setAuthenticatedUserData(data));
    } catch (err) {
        console.error(err)
    }
};
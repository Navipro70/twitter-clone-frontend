import {AppStateType, InferActionsType} from "./store";
import {ThunkAction} from "redux-thunk";
import {error, TLoginUser, token, TSignUp} from '../types/types'
import {usersRoute} from "../api/usersRoute";
import {axiosInstance} from "../api/axiosInstance";

let initialState = {
    payload: null as null | string
};
type initialStateType = typeof initialState
type ActionType = InferActionsType<typeof actions>

export const userReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "LOGIN_USER":
            return {
                payload: action.payload
            };
        default:
            return {...state}
    }
};

const actions = {
    loginUser: (payload: any) => ({
        type: 'LOGIN_USER',
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
        const token = data.token; //User Token
        localStorage.setItem('firebaseToken', token!);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
        const token = data.token; //User Token
        localStorage.setItem('firebaseToken', token!);
        history.push('/');
    }
}
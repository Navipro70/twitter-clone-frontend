import {axiosInstance, defaultErrorHandler} from './axiosInstance'
import {error, token, TLoginUser, TSignUp, TArrayOfLikes, TCredentials} from "../types/types"

//TODO REMOVE ANY
type TAuthenticatedUserData = {
    notifications: any
    likes: TArrayOfLikes | []
    credentials: TCredentials
}

export const usersRoute = {
    loginUser: (data: TLoginUser) => {
        return axiosInstance
            .post<token | error>('login', data)
            .then(res => res.data)
            .catch(defaultErrorHandler)
    },
    signUpUser: (data: TSignUp) => {
        return axiosInstance
            .post<token | error>('signup', data)
            .then(res => res.data)
            .catch(defaultErrorHandler)
    },
    getAuthenticatedUserData: () => {
        return axiosInstance.get<TAuthenticatedUserData>('user')
            .then(res => res.data)
            .catch(defaultErrorHandler)
    }
};
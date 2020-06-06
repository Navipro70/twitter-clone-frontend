import {axiosInstance} from './axiosInstance';
import {error, token} from "../types/types";

type TLoginUser = {
    email: string
    password: string
}

type TSignUp = {
    confirmPassword: string
    handle: string
}

export const usersRoute = {
    loginUser: (data: TLoginUser) => {
        return axiosInstance
            .post<token | error>('login', data)
            .then(res => res.data)
            .catch(err => {
                console.error(err);
                return err.response.data
            })
    },
    signUpUser: (data: TSignUp & TLoginUser) => {
        return axiosInstance
            .post('signup', data)
            .then(res => res.data)
            .catch(err => {
                console.error(err);
                return err.response.data;
            })
    }
};
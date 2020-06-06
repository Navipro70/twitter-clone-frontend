import {axiosInstance} from './axiosInstance';
import {error, token, TLoginUser, TSignUp} from "../types/types";

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
    signUpUser: (data: TSignUp) => {
        return axiosInstance
            .post('signup', data)
            .then(res => res.data)
            .catch(err => {
                console.error(err);
                return err.response.data;
            })
    }
};
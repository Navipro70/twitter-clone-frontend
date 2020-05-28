import {axiosInstance} from './axiosInstance';

type token = {
    token: string
}

type TLoginUser = {
    email: string
    password: string
}

export const usersRoute = {
    loginUser: (data: TLoginUser) => {
        return axiosInstance
            .post<token>('login', data)
            .then(res => res.data)
            .catch(err => {
                console.error(err);
                return err.response.data
            })
    }
};
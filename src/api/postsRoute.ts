import {axiosInstance} from './axiosInstance';
import {ArrayOfTPosts, error, TPost} from '../types/types';

export const postsRoute = {
    getAllPosts: () => {
        return axiosInstance
            .get<ArrayOfTPosts>('posts')
            .then(res => res.data)
    },
    createPost: (postText: string) => {
        return axiosInstance
            .post<TPost | error>('createPost', {postText})
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.error(err);
                return err.response.data
            })
    },
};
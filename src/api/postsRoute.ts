import {axiosInstance, defaultErrorHandler} from './axiosInstance';
import {ArrayOfTPosts, error, TPost} from '../types/types';

export const postsRoute = {
    getAllPosts: () => {
        return axiosInstance
            .get<ArrayOfTPosts>('posts')
            .then(res => res.data)
            .catch(defaultErrorHandler)
    },
    createPost: (postText: string) => {
        return axiosInstance
            .post<TPost | error>('createPost', {postText})
            .then(res => res.data)
            .catch(defaultErrorHandler)
    },
};
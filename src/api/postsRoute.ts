import {axiosInstance} from './axiosInstance';
import { ArrayOfTPosts } from '../types/types';

export const postsRoute = {
    getAllPosts: () => {
        return axiosInstance
            .get<ArrayOfTPosts>('posts')
            .then(res => res.data)
            .catch(err => console.error(err))
    }
};
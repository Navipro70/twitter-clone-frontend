import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://europe-west3-social-app-b798b.cloudfunctions.net/api/",
});
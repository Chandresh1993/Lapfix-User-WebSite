import axios from "axios";

const authApi = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

authApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default authApi;

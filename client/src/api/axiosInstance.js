import axios from "axios";
import { jwtDecode } from "jwt-decode"

// const API_URL = 'http://localhost:5000/api/';
const API_URL = import.meta.env.VITE_API_URL + '/api/' || 'http://localhost:5000/api/';

const axiosInstance = axios.create({
    baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            const decoded = jwtDecode(accessToken);
            const isExpired = decoded.exp * 1000 < Date.now();

            if (isExpired) {
                console.log('Access token expired, attempting to refresh...');
                try {

                    const refreshToken = localStorage.getItem("refreshToken");
                    const response = await axios.post(`${API_URL}auth/refresh-token`, {
                        token: refreshToken
                    });

                    const newAccessToken = response.data.accessToken;
                    localStorage.setItem("accessToken", newAccessToken);

                    config.headers.Authorization = `Bearer ${newAccessToken}`;

                } catch (error) {
                    console.log('Session expired, please log in again.');
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    window.location.href = "/login";
                    return Promise.reject(error);
                }
            } else {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;
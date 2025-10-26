import axiosInstance from './axiosInstance';

const register = (name, email, password) => {
    return axiosInstance.post('auth/register', { name, email, password });
}

const login = (email, password) => {
    return axiosInstance.post('auth/login', { email, password });
}

const logout = (refreshToken) => {
    return axiosInstance.post('auth/logout', { token: refreshToken });
}

const verify = () => {
    return axiosInstance.get('auth/verify');
}

const authService = {
    register,
    login,
    logout,
    verify
};

export default authService;
import axiosInstance from './axiosInstance';

const handleError = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
    }
    if (error.response && error.response.data) {
        throw new Error(error.response.data || 'An error occurred on the server.');
    }
    throw new Error(error.message || 'An unknown network error occurred.');
};

const register = async (name, email, password) => {
    try {
        const response = await axiosInstance.post('auth/register', { name, email, password });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

const login = async (email, password) => {
    try {
        const response = await axiosInstance.post('auth/login', { email, password });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

const logout = async (refreshToken) => {
    try {
        const response = await axiosInstance.post('auth/logout', { token: refreshToken });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

const verify = async () => {
    try {
        const response = await axiosInstance.get('auth/verify');
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

const authService = {
    register,
    login,
    logout,
    verify
};

export default authService;
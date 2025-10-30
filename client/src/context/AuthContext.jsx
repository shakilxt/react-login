import React, { useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import authService from "../api/authService";

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        const varifyUser = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                try {

                    await authService.verify();
                    
                    const decoded = jwtDecode(localStorage.getItem('accessToken'));
                    setUser(decoded);

                } catch (error) {
                    console.log("Session verification failed.", error);
                    logout()
                }
            }
            setIsInitializing(false);
        }

        varifyUser();
    }, []);

    const handleLogin = async (email, password) => {
        setLoading(true);
        setError(null);

        try {   

            const data = await authService.login(email, password);

            const { accessToken, refreshToken } = data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            const decodedUser = jwtDecode(accessToken);
            setUser(decodedUser)
            return true;

        } catch (err) {
            setError(err.message || 'Login failed');
            return false;
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async (name, email, password) => {
        setLoading(true);
        setError(null);

        try {

            await authService.register(name, email, password);
            return await handleLogin(email, password);

        } catch (err) {
            setError(err.message || 'Registration failed');
            return false;
        } finally {
            setLoading(false);
        }
    }

    const logout = () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            authService.logout(refreshToken);
        }
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        setUser(null);
    }

    if (isInitializing) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, loading, error, setError, handleLogin, handleRegister, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext);
}
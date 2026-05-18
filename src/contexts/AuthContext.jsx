import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api.js';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const storedUser = localStorage.getItem('assessmate_user');
                const token = localStorage.getItem('assessmate_token');
                
                if (token) {
                    try {
                        const result = await authAPI.verify();
                        if (result.user) {
                            setUser(result.user);
                        }
                    } catch (e) {
                        console.error("Token verification failed", e);
                        localStorage.removeItem('assessmate_token');
                        localStorage.removeItem('assessmate_user');
                    }
                } else if (storedUser) {
                    try {
                        setUser(JSON.parse(storedUser));
                    } catch (e) {
                        console.error("Failed to parse stored user", e);
                    }
                }
            } finally {
                setLoading(false);
            }
        };
        
        verifyUser();
    }, []);

    const login = async (email, password) => {
        try {
            setError(null);
            const result = await authAPI.login(email, password);
            authAPI.setToken(result.token);
            localStorage.setItem('assessmate_user', JSON.stringify(result.user));
            setUser(result.user);
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const signup = async (email, password, role, firstName, lastName, institution) => {
        try {
            setError(null);
            const result = await authAPI.signup(email, password, role, firstName, lastName, institution);
            authAPI.setToken(result.token);
            localStorage.setItem('assessmate_user', JSON.stringify(result.user));
            setUser(result.user);
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const logout = () => {
        setUser(null);
        authAPI.removeToken();
        localStorage.removeItem('assessmate_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

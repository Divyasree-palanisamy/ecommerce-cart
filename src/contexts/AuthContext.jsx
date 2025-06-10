import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = async (email, password) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // For demo purposes, accept any email/password combination
            const userData = {
                id: 1,
                name: email.split('@')[0],
                email,
                avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
            };

            setUser(userData);
            toast.success('Login successful');
            return true;
        } catch (error) {
            toast.error('Login failed');
            return false;
        }
    };

    const register = async (name, email, password) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const userData = {
                id: Date.now(),
                name,
                email,
                avatar: `https://ui-avatars.com/api/?name=${name}&background=random`,
            };

            setUser(userData);
            toast.success('Registration successful');
            return true;
        } catch (error) {
            toast.error('Registration failed');
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        toast.info('Logged out successfully');
    };

    const updateProfile = async (updates) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setUser(prevUser => ({
                ...prevUser,
                ...updates,
            }));
            toast.success('Profile updated successfully');
            return true;
        } catch (error) {
            toast.error('Failed to update profile');
            return false;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                updateProfile,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}; 
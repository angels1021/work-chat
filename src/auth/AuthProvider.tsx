import { useState, useCallback, useEffect } from 'react';

import { getCurrentUser, loginUser, AddUser, logoutUser } from '@api';
import type { LoginForm, JoinForm, User } from '@api';
import { AuthContext } from './context';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(getCurrentUser());

    const login = useCallback((userForm: LoginForm) => {
        const user = loginUser(userForm);
        setUser(user);
    }, [])

    const join = useCallback((userForm: JoinForm) => {
        const user = AddUser(userForm);
        setUser(user);
    }, [])

    const logout = useCallback(() => {
        logoutUser();
        setUser(null)
    }, [])

    useEffect(() => {
        setUser(getCurrentUser());
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, join,logout }}>
            {children}
        </AuthContext.Provider>
    );
};
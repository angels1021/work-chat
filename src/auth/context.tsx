import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { User, LoginForm, JoinForm } from '@api';
import { getCurrentUser, loginUser, AddUser, logoutUser } from '@api';

export interface AuthContextType {
    user: User | null;
    login: (userForm: LoginForm) => void;
    join: (userForm: JoinForm) => void;
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    login: (userForm: LoginForm) => {},
    join: (userForm: JoinForm) => {},
    logout: () => {}
});

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

export const useAuth = () => useContext(AuthContext);

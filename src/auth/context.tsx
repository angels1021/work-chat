import { createContext, useContext } from 'react';
import type { User, LoginForm, JoinForm } from '@api';

export interface AuthContextType {
    user: User | null;
    login: (userForm: LoginForm) => void;
    join: (userForm: JoinForm) => void;
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    login: (_userForm: LoginForm) => {},
    join: (_userForm: JoinForm) => {},
    logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

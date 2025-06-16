import { appUsersStorage, activeUserStorage } from '@utilities';
import { v4 as uuid } from 'uuid';
import type { User, UserData, LoginForm, JoinForm } from './auth.types';

export const AUTH_ERRORS = {
    invalidPassword: 'Invalid password or email, please check your credentials',
    userNotFound: 'Could not find user, please check your credentials',
    userAlreadyExists: 'User already exists'
} as const;

export const AUTH_FIELD_ERRORS = {
    name: 'Please enter your full name',
    email: 'Please enter a valid email',
    pw: 'Please enter your password'
} as const;

export const getAppUsers = (): UserData[] => {
    let stored = appUsersStorage.get();
    if (!stored) {
        stored = [];
        appUsersStorage.set(stored);
    };
    return stored;
}

export const getCurrentUser = (): User | null => {
    const user = activeUserStorage.get();
    if (!user) return null;
    try {
        return user;
    } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        return null;
    }
}
const setCurrentUser = (user: User) => {
    activeUserStorage.set({ name: user.name, email: user.email, id: user.id });
}

// login
export const loginUser = (user: LoginForm) => {
    const users = getAppUsers() ?? [];
    const existingUser = users.find(u => u.email === user.email);
    if (!existingUser) {
        throw new Error(AUTH_ERRORS.userNotFound);
    }
    if (existingUser.pw !== atob(user.pw)) {
        throw new Error(AUTH_ERRORS.invalidPassword);
    }
    setCurrentUser(existingUser);
    return existingUser;
}

// join
export const AddUser = (user: JoinForm) => {
    const users = getAppUsers() ?? [];
    const existingUser = users.find(u => u.email === user.email);
    if (existingUser) {
        throw new Error(AUTH_ERRORS.userAlreadyExists);
    }

    const newUser = { id: uuid(), name: user.name, email: user.email, pw: btoa(user.pw) };
    users.push(newUser);
    appUsersStorage.set(users);
    setCurrentUser(newUser);
    return newUser;
}

export const logoutUser = () => {
    activeUserStorage.remove();
}

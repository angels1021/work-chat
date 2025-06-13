export interface UserData {
    id: string;
    name: string;
    email: string;
    pw: string;
}

export interface LoginForm {
    email: string;
    pw: string;
}

export type JoinForm = Pick<UserData, 'name' | 'email' | 'pw'>;

export type User = Pick<UserData, 'id' | 'name' | 'email'>;

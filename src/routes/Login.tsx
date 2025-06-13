import { Link , useNavigate, useLocation } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { AUTH_ERRORS, AUTH_FIELD_ERRORS, type LoginForm } from '@api';
import { Input, Button, ErrorMessage } from '@components';
import { useAuth } from '../auth';

export const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();
    
    const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginForm>();

    const onSubmit: SubmitHandler<LoginForm> = async ({ email, pw }) => {
        if (!email || !pw) {
            return;
        }

        try {
            login({ email, pw });
            navigate(state?.from ?? '/');
        } catch (error) {
            if (error instanceof Error) {
                if (error?.message === AUTH_ERRORS.invalidPassword) {
                    setError('pw', { message: error.message });
                } else {
                    setError('email', { message: error.message });
                }
            }   
        }
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-10">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-white">
                    Welcome!
                </h1>
                <div className="text-2xl font-normal">Please login to start chatting</div>
            </div>
            
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)} noValidate>
                <label htmlFor="email">
                    <Input
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        autoFocus
                        required
                        aria-invalid={!!errors.email?.message}
                        className={errors.email?.message ? 'invalid' : ''}
                        {...register('email', { required: AUTH_FIELD_ERRORS.email })}
                    /> 
                    <ErrorMessage className="invisible peer-user-invalid:visible peer-[.invalid]:visible">{errors.email?.message || AUTH_FIELD_ERRORS.email}</ErrorMessage>
                </label>
                <label htmlFor="pw">
                    <Input
                        type="password"
                        placeholder="Password"
                        autoComplete="password"
                        required aria-invalid={!!errors.pw?.message}
                        className={errors.pw?.message ? 'invalid' : ''}
                        {...register('pw', { required: AUTH_FIELD_ERRORS.pw })}
                    /> 
                    <ErrorMessage className="invisible peer-user-invalid:visible peer-[.invalid]:visible">{errors.pw?.message || AUTH_FIELD_ERRORS.pw}</ErrorMessage>
                </label>
                <Button type="submit" color="secondary" size="lg" className="mt-10">Let's Go!</Button>
                <Link to="/join" state={state} className="text-center underline mt-4">Don't have an account? Join here</Link>
            </form>
        </div>
    );
};
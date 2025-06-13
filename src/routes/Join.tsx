// import { useRouter, useNavigate, useSearch } from '@tanstack/react-router';
import { useNavigate, useLocation } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { AUTH_ERRORS, AUTH_FIELD_ERRORS, type JoinForm } from '@api';
import { Input, Button, ErrorMessage } from '@components';
import { useAuth } from '../auth';

export const Join = () => {
    const { join } = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { register, handleSubmit, setError, formState: { errors } } = useForm<JoinForm>();

    const onSubmit: SubmitHandler<JoinForm> = async ({ name, email, pw }) => {
        try {
            join({ name, email, pw });
            navigate(state?.from ?? '/');
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === AUTH_ERRORS.userAlreadyExists) {
                    setError('email', { message: error.message });
                }
            }
        }
    }
    
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-12">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-white">
                    Create an account
                </h1>
                <div className="text-2xl font-normal">Please fill in the details below</div>
            </div>
            
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)} noValidate>
                <label htmlFor="name">
                    <Input type="text" placeholder="Full Name" autoComplete="name" autoFocus required aria-invalid={!!errors.name?.message} {...register('name', { required: AUTH_FIELD_ERRORS.name })} /> 
                    <ErrorMessage className="invisible peer-user-invalid:visible peer-[.invalid]:visible">{errors.name?.message || AUTH_FIELD_ERRORS.name}</ErrorMessage>
                </label>
                <label htmlFor="email">
                    <Input type="email" placeholder="Email" autoComplete="email" required aria-invalid={!!errors.email?.message} {...register('email', { required: AUTH_FIELD_ERRORS.email })} /> 
                    <ErrorMessage className="invisible peer-user-invalid:visible peer-[.invalid]:visible">{errors.email?.message || AUTH_FIELD_ERRORS.email}</ErrorMessage>
                </label>
                <label htmlFor="pw">
                    <Input type="password" placeholder="Password" autoComplete="password" required aria-invalid={!!errors.pw?.message} {...register('pw', { required: AUTH_FIELD_ERRORS.pw })} /> 
                    <ErrorMessage className="invisible peer-user-invalid:visible peer-[.invalid]:visible">{errors.pw?.message || AUTH_FIELD_ERRORS.pw}</ErrorMessage>
                </label>
                <Button type="submit" color="secondary" size="lg" className="mt-10">Let's Chat!</Button>
            </form>
        </div>
    );
};
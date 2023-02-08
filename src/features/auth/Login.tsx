import React, {FC, useState} from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import {AppWrapper, ErrorText, FormWrapper} from '../../utils/StyledComponents/StyledComponents';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {loginTC} from './auth-reducer';
import {NavLink, useNavigate} from 'react-router-dom';
import {SuperInput} from "../SuperInput";

type FormValues = {
    rememberMe: boolean;
    password: string;
    email: string;
};

export const Login: FC = () => {
    // для показування та приховування пароля
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)


    // форма
    const {control, register, reset, handleSubmit, formState: {errors}} = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        }
    })
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        dispatch(loginTC(data))
        reset()
    }

    if (isLoggedIn) navigate('/profile')

    return <FormWrapper>
        <h2>Sing in</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <TextField
                    label="Email"
                    margin="normal"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Email is invalid, name@email.com'
                        }
                    })}
                />
                {errors?.email && <ErrorText>{errors.email.message}</ErrorText>}
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: 'Password is required',
                        minLength: {value: 8, message: 'Min 8 characters'},
                        maxLength: {value: 36, message: 'Max 36 characters'}
                    }}
                    render={({field}) => <SuperInput
                        margin={'normal'}
                        type={'password'}
                        error={!!errors.password?.message}
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        value={field.value}/>}
                />
                {errors?.password && <ErrorText>{errors.password.message}</ErrorText>}
                <FormControlLabel
                    label={'Remember me'}
                    control={<Checkbox {...register('rememberMe')} />}/>
                <NavLink to={'/forgot-password'}>Forgot Password?</NavLink>
                <Button
                    disabled={status === 'loading'}
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                >
                    Sing in
                </Button>
                <p>Already have an account?</p>
                <NavLink to={'/signup'}>Sing Up</NavLink>
            </FormGroup>
        </form>
    </FormWrapper>
};

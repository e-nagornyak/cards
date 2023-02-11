import React, {FC} from 'react';
import FormGroup from "@mui/material/FormGroup";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {NavLink, useNavigate} from "react-router-dom";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import {SuperInput} from "../SuperInput";
import {registerTC} from "./auth-reducer";

type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
};

export const Signup: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)
    const isRegistered = useAppSelector(state => state.auth.isRegistered)

    const {control, handleSubmit, setError, formState: {errors}} = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        }
    })
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        if (data.password === data.confirmPassword) {
            dispatch(registerTC({email: data.email, password: data.password}))
            if (isRegistered) {
                navigate('/login')
            }
        } else {
            setError("confirmPassword", {type: 'custom', message: 'custom message'})
        }
    }

    if (isLoggedIn) navigate('/profile')

    return <>
        <h2>Sing Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: 'Password is required',
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Email is invalid, name@email.com'
                        }
                    }}
                    render={({field}) => <SuperInput
                        margin={'normal'}
                        type={'text'}
                        error={errors.email}
                        name={'Email'}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        value={field.value}/>}
                />
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
                        error={errors.password}
                        name={'Password'}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        value={field.value}/>}
                />
                <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                        required: 'Password is required',
                        minLength: {value: 8, message: 'Min 8 characters'},
                        maxLength: {value: 36, message: 'Max 36 characters'}
                    }}
                    render={({field}) => <SuperInput
                        margin={'normal'}
                        type={'password'}
                        error={errors.confirmPassword}
                        name={'Confirm password'}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        value={field.value}/>}
                />

                <Button
                    disabled={status === 'loading'}
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                >
                    Sing Up
                </Button>
                <p>Already have an account?</p>
                <NavLink to={'/login'}>Sing Up</NavLink>
            </FormGroup>
        </form>
    </>
};



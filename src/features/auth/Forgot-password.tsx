import React, {FC} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {SuperInput} from "../SuperInput";


export const ForgotPassword: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)
    const {control, register, reset, handleSubmit, formState: {errors}} = useForm<{ email: string }>({
        defaultValues: {
            email: '',

        }
    })
    const onSubmit: SubmitHandler<{ email: string }> = (data) => {
        // dispatch(loginTC(data))
        // reset()
    }

    if (isLoggedIn) navigate('/profile')

    return <>
        <h2>Forgot your password?</h2>
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
        <p>Enter your email address and we will send you further instructions </p>
        <Button
            disabled={status === 'loading'}
            type={'submit'}
            variant={'contained'}
            color={'primary'}
        >
            Send Instructions
        </Button>
        <NavLink color={'#366EFF'} to={'/login'}>Try logging in</NavLink>
    </>
};


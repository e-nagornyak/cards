import React, {FC} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import {forgotPasswordTC} from "./auth-reducer";


export const ForgotPassword: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)
    const {control, reset, handleSubmit, formState: {errors}} = useForm<{ email: string }>({
        defaultValues: {
            email: '',
        }
    })
    const onSubmit: SubmitHandler<{ email: string }> = (data) => {
        dispatch(forgotPasswordTC(data.email))
        sessionStorage.setItem('email', data.email)
        reset()
        navigate('/forgot-password/check-email')
    }

    if (isLoggedIn) navigate('/profile')

    return <>
        <h2>Forgot your password?</h2>
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
                    render={({field}) =>
                        <TextField
                            sx={{padding: '5px 0', width: '100%'}}
                            label="Email"
                            variant="standard"
                            value={field.value}
                            id="outlined-error"
                            error={!!errors.email?.message}
                            autoFocus
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                        />}
                />
                <p>Enter your email address and we will send you further instructions</p>
                <Button
                    disabled={status === 'loading'}
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                >
                    Send Instructions
                </Button>
            </FormGroup>
        </form>
        <NavLink color={'#366EFF'} to={'/login'}>Try logging in</NavLink>
    </>
};


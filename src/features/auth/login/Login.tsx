import * as yup from "yup";
import React, {FC} from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {loginTC} from '../auth-reducer';
import {Navigate, NavLink} from 'react-router-dom';
import {TextField} from '@mui/material';
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {LoginSchema} from "./login-shema";
import {InputPassword} from "../../InputPassword";

type FormData = yup.InferType<typeof LoginSchema>;

export const Login: FC = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)

    const {register, control, handleSubmit, formState: {errors, touchedFields}} = useForm<FormData>({
        resolver: yupResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        }
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        dispatch(loginTC(data))
    }

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }

    return <>
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <TextField
                    {...register("email")}
                    margin={"normal"}
                    label={"Email"}
                    fullWidth
                    id={"outlined-error-helper-text"}
                    helperText={errors.email?.message}
                    error={touchedFields.email && !!errors.email}/>
                <InputPassword
                    name={'password'}
                    label={'Password'}
                    margin={"normal"}
                    control={control}/>
                <FormControlLabel
                    label={'Remember me'}
                    control={<Checkbox {...register('rememberMe')} />}/>
                <NavLink style={{textDecoration: 'none'}} to={'/forgot-password'}>Forgot Password?</NavLink>
                <Button
                    disabled={status === 'loading'}
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                >
                    Sign in
                </Button>
                <p style={{textAlign: 'center'}}>Already have an account?</p>
                <NavLink to={'/signup'}>Sign Up</NavLink>
            </FormGroup>
        </form>
    </>
};

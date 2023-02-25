import React, {FC} from 'react';
import FormGroup from "@mui/material/FormGroup";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import {InputPassword} from "../../InputPassword";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import {signUpSchema} from "./signup-shema";
import {registerTC} from "../auth-reducer";
import {FormWrapper} from '../../../utils/styled-components/StyledComponents';

type FormData = yup.InferType<typeof signUpSchema>;

export const Signup: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)
    const isRegistered = useAppSelector(state => state.auth.isRegistered)


    const {register, control, handleSubmit, formState: {errors, touchedFields}} = useForm<FormData>({
        resolver: yupResolver(signUpSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        dispatch(registerTC({email: data.email, password: data.password}))
        if (isRegistered) {
            navigate('/login')
        }
    }

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }

    return <>
        <FormWrapper>
        <h2>Sign Up</h2>
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
                <InputPassword
                    name={'confirmPassword'}
                    label={'Confirm Password'}
                    margin={"normal"}
                    control={control}/>
                <Button
                    disabled={status === 'loading'}
                    type={'submit'}
                    variant={'contained'}
                    color={'secondary'}
                >
                    Sign Up
                </Button>
                <p>Already have an account?</p>
                <NavLink className={'link-sign-up'} to={'/login'}>Sign In</NavLink>
            </FormGroup>
        </form>
        </FormWrapper>
    </>
};
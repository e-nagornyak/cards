import React, {FC} from 'react';
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {SubmitHandler, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import {forgotPasswordTC} from "../auth-reducer";
import {FormWrapper} from '../../../utils/styled-components/StyledComponents';
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {ForgotSchema} from "./forgot-shema";

type FormData = yup.InferType<typeof ForgotSchema>;

export const ForgotPassword: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: yupResolver(ForgotSchema),
        defaultValues: {
            email: '',
        }
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        dispatch(forgotPasswordTC(data.email))
        sessionStorage.setItem('email', data.email)
        navigate('/forgot-password/check-email')
    }

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }

    return <>
        <FormWrapper>
        <h2>Forgot your password?</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <TextField
                    {...register("email")}
                    margin={"normal"}
                    label={"Email"}
                    fullWidth
                    id={"outlined-error-helper-text"}
                    helperText={errors.email?.message}
                    error={!!errors.email}/>
                <p>Enter your email address and we will send you further instructions</p>
                <Button
                    disabled={status === 'loading'}
                    type={'submit'}
                    variant={'contained'}
                    color={'secondary'}
                >
                    Send Instructions
                </Button>
                    <p className={'forgot-remember'}>Did you remember your password?</p>
            </FormGroup>
        </form>
        <NavLink color={'#366EFF'} to={'/login'}>Try logging in</NavLink>
        </FormWrapper>
    </>
};


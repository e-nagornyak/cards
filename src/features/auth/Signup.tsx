import React, {FC} from 'react';
import FormGroup from "@mui/material/FormGroup";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {NavLink, useNavigate} from "react-router-dom";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import {SuperInput} from "../SuperInput";
import {registerTC} from "./auth-reducer";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import TextField from "@mui/material/TextField";

const schema = yup.object({
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .min(7, 'Message')
        .required('Message'),
    confirmPassword: yup
        .string()
        .min(7, 'Message')
        .oneOf([yup.ref('password'), undefined], 'Пароли не совпадают')
        .required('Message'),
})

type FormData = yup.InferType<typeof schema>;

export const Signup: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)
    const isRegistered = useAppSelector(state => state.auth.isRegistered)


    const {register, getFieldState, handleSubmit, formState: {errors, touchedFields}} = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            // password: '',
            // confirmPassword: ''
        }
    });
    const onSubmit = (data: FormData) => console.log(data);

    // const onSubmit: SubmitHandler<FormValues> = (data) => {
    //     if (data.password === data.confirmPassword) {
    //         dispatch(registerTC({email: data.email, password: data.password}))
    //         if (isRegistered) {
    //             navigate('/login')
    //         }
    //     } else {
    //         setError("confirmPassword", {type: 'custom', message: 'custom message'})
    //     }
    // }

    if (isLoggedIn) navigate('/profile')
    // console.log(getFieldState('email'))
    // console.log(touchedFields)


    return <>
        <h2>Sing Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <TextField
                    {...register('email')}
                    margin={'normal'}
                    label="Email"
                    variant="standard"
                    helperText={errors.email?.message}
                    error={touchedFields.email && !!errors.email}
                />
                {/*<Controller*/}
                {/*    name="password"*/}
                {/*    control={control}*/}
                {/*    rules={{*/}
                {/*        required: 'Password is required',*/}
                {/*        minLength: {value: 8, message: 'Min 8 characters'},*/}
                {/*        maxLength: {value: 36, message: 'Max 36 characters'}*/}
                {/*    }}*/}
                {/*    render={({field}) => <SuperInput*/}
                {/*        margin={'normal'}*/}
                {/*        type={'password'}*/}
                {/*        error={errors.password}*/}
                {/*        name={'Password'}*/}
                {/*        onBlur={field.onBlur}*/}
                {/*        onChange={field.onChange}*/}
                {/*        value={field.value}/>}*/}
                {/*/>*/}
                {/*<Controller*/}
                {/*    name="confirmPassword"*/}
                {/*    control={control}*/}
                {/*    rules={{*/}
                {/*        required: 'Password is required',*/}
                {/*        minLength: {value: 8, message: 'Min 8 characters'},*/}
                {/*        maxLength: {value: 36, message: 'Max 36 characters'}*/}
                {/*    }}*/}
                {/*    render={({field}) => <SuperInput*/}
                {/*        margin={'normal'}*/}
                {/*        type={'password'}*/}
                {/*        error={errors.confirmPassword}*/}
                {/*        name={'Confirm password'}*/}
                {/*        onBlur={field.onBlur}*/}
                {/*        onChange={field.onChange}*/}
                {/*        value={field.value}/>}*/}
                {/*/>*/}

                <Button
                    disabled={status === 'loading'}
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                >
                    Sing Up
                </Button>
                <p>Already have an account?</p>
                <NavLink to={'/login'}>Sing Ip</NavLink>
            </FormGroup>
        </form>
    </>
};



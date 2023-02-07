import React, {FC, useState} from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import {VisibilityOff} from '@mui/icons-material';
import Visibility from '@mui/icons-material/Visibility';
import {AppWrapper, ErrorText, FormWrapper} from '../../../utils/StyledComponents/StyledComponents';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {loginTC} from '../auth-reducer';
import {NavLink, useNavigate} from 'react-router-dom';

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
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    // форма
    const {register, reset, handleSubmit, formState: {errors}} = useForm<FormValues>({
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
                <TextField
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Min 8 characters'
                        },
                        maxLength: {
                            value: 36,
                            message: 'Max 36 characters'
                        }
                    })}
                    margin="normal"
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                    }}
                />
                {errors?.password && <ErrorText>{errors.password.message}</ErrorText>}
                <FormControlLabel

                    label={'Remember me'}
                    control={
                        <Checkbox
                            {...register('rememberMe')}
                        />
                    }/>
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

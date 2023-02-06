import React, {FC, useState} from 'react';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import {VisibilityOff} from '@mui/icons-material';
import Visibility from '@mui/icons-material/Visibility';
import {AppWrapper, FormWrapper} from '../../../utils/StyledComponents/StyledComponents';
import {Resolver, SubmitHandler, useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {loginTC} from '../auth-reducer';
import {useNavigate} from 'react-router-dom';

type FormValues = {
    rememberMe: boolean;
    password: string;
    email: string;
};
// const resolver: Resolver<FormValues> = async (values) => {
//     return {
//         values: values.email ? values : {},
//         errors: !values.email
//             ? {
//                 email: {
//                     type: 'required',
//                     message: 'This is required.',
//                 },
//             }
//             : {},
//     };
// };
export const Login: FC = () => {
    // для показування та приховування пароля
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();
    //форма
    const {register, reset, handleSubmit, formState: {errors, isValid}} = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        }
    })
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        reset()
        dispatch(loginTC(data))
        console.log(data);
    }
    if (isLoggedIn) navigate('/profile')
    return <AppWrapper>
        <FormWrapper>
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
                                message: 'Email is invalid'
                            }
                        })}
                        helperText={errors?.email && <p>{errors.email.message}</p>}
                    />
                    {/*{errors?.email && <p>{errors.email.message}</p>}*/}
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Мінімум 8 символів'
                            }
                        })}
                        helperText={errors?.password && <p>{errors.password.message}</p>}
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
                    <FormControlLabel

                        label={'Remember me'}
                        control={
                            <Checkbox
                                {...register('rememberMe')}
                            />
                        }/>
                    <a href={'/'}>Forgot Password?</a>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Sing in
                    </Button>
                    <p>Already have an account?</p>
                    <a href="/">Sing Up</a>
                </FormGroup>
            </form>
        </FormWrapper>
    </AppWrapper>
};

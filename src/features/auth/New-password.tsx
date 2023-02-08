import React, {FC} from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {setNewPasswordTC} from "./auth-reducer";
import {SuperInput} from "../SuperInput";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {useNavigate, useParams} from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";

export const NewPassword: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const status = useAppSelector(state => state.app.status)
    const {token} = useParams<{ token: string }>()

    const {control, reset, handleSubmit, formState: {errors}} = useForm<{ password: string }>({
        defaultValues: {
            password: '',
        }
    })
    const onSubmit: SubmitHandler<{ password: string }> = (data) => {
        const dataWithToken = {
            password: data.password,
            resetPasswordToken: token as string
        }

        dispatch(setNewPasswordTC(dataWithToken))
        reset()
        navigate('/login')
    }


    return <>
        <h2>Create new password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup sx={{display: 'flex', height: '260px', justifyContent: 'space-around'}}>
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
                <p>Create new password and we will send you further instructions to email</p>
                <Button
                    disabled={status === 'loading'}
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                >
                    Sing in
                </Button>
            </FormGroup>
        </form>

    </>
};


import React, {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {setNewPasswordTC} from "../auth-reducer";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {useNavigate, useParams} from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {NewPasswordShema} from "./newPassword-shema";
import {InputPassword} from "../../InputPassword";
import {FormWrapper} from '../../../utils/StyledComponents/StyledComponents';

type FormData = yup.InferType<typeof NewPasswordShema>;

export const NewPassword: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const status = useAppSelector(state => state.app.status)
    const {token} = useParams<{ token: string }>()

    const {control, handleSubmit} = useForm<FormData>({
        resolver: yupResolver(NewPasswordShema),
        defaultValues: {
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const dataWithToken = {password: data.password, resetPasswordToken: token as string}
        dispatch(setNewPasswordTC(dataWithToken))
        navigate('/login')
    }

    return <>
        <FormWrapper>
        <h2>Create new password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup sx={{display: 'flex', height: '260px', justifyContent: 'space-around'}}>
                <InputPassword
                    name={'password'}
                    label={'Password'}
                    margin={"normal"}
                    control={control}/>
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
        </FormWrapper>
    </>
};


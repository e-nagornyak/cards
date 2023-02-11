import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import sendIcon from "../../assets/image/send-message.svg"
import {FormWrapper} from '../../utils/StyledComponents/StyledComponents';

export const CheckEmail = () => {
    const [email, setEmail] = useState<string | null>('')
    const navigate = useNavigate()

    useEffect(() => {
        setEmail(sessionStorage.getItem('email'))
    }, [email])

    const onClickHandler = () => navigate('/login')

    return (
        <>
            <FormWrapper>
            <h2>Check Email</h2>
            <img src={sendIcon} alt="send icon"/>
            <p style={{textAlign: 'center'}}>{`We’ve sent an Email with instructions to ${email}`}</p>
            <Button
                onClick={onClickHandler}
                fullWidth
                type={'submit'}
                variant={'contained'}
                color={'primary'}
            >
                Back to login
            </Button>
            </FormWrapper>
        </>
    );
};


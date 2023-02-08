import React from 'react';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import sendIcon from "../../assets/image/send-message.svg"

export const CheckEmail = () => {
    const navigate = useNavigate()
    const email = sessionStorage.getItem('email')
    const onClickHandler = () => navigate('/login')

    return (
        <>
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
        </>
    );
};


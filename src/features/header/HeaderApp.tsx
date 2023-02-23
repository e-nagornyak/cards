import React, {useState} from 'react';
import headerIcon from '../../assets/image/icon_logo.svg'
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/hooks";
import s from './HeaderApp.module.scss'
import {HeaderProfile} from "./header-profile/HeaderProfile";
import {Button} from "../button/Button";

export const HeaderApp = () => {
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const profile = useAppSelector(state => state.profile)

    return <header className={s.wrapper}>
        <img className={s.logo} src={headerIcon} alt={'logo'}/>
        {isLoggedIn
            ? <HeaderProfile name={profile.name}/>
            : <Button onClick={() => navigate('/login')} className={s.btn} title={"Sign in"}/>
        }
    </header>
}

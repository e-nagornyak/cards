import React from 'react';
import headerIcon from '../../assets/image/icon_logo.png'
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
        <div className={s.logo_wrapper}>
            <img className={s.logo} src={headerIcon} alt={'logo'}/>
            <span>Learn with us</span>
        </div>
        {isLoggedIn
            ? <HeaderProfile name={profile.name}/>
            : <Button onClick={() => navigate('/login')} className={s.btn} title={"Sign in"}/>
        }
    </header>
}

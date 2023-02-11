import React from 'react';
import headerIcon from '../../../assets/image/icon_logo.svg'
import {HeaderWrapper} from "../../../utils/StyledComponents/StyledComponents";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../hooks/hooks";
import avatar from '../../../assets/image/avatar.png'

export const HeaderApp = () => {
    const navigate = useNavigate()
    // const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const profile = useAppSelector(state => state.profile)
    // const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    // const LogoutHandler = useCallback(() => {
    //     dispatch(logoutTC())
    // }, [dispatch])

    return <HeaderWrapper>
        <img src={headerIcon} alt={'logo'}/>
        {isLoggedIn
            ? <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                <a href={'/profile'}>{profile.name}</a>
                <img style={{width: '45px', height: '45px'}} alt='avatar' src={avatar}></img>
            </div>
            : <Button onClick={() => navigate('/login')} color={'primary'} variant="contained">Sign in</Button>}
    </HeaderWrapper>
}

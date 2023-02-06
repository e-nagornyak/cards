import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import headerIcon from '../../../assets/image/icon_logo.svg'
import {HeaderWrapper} from "../../../utils/StyledComponents/StyledComponents";

export const HeaderApp = () => {
    // const dispatch = useAppDispatch()
    // const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    // const LogoutHandler = useCallback(() => {
    //     dispatch(logoutTC())
    // }, [dispatch])

    return <HeaderWrapper>
        <img src={headerIcon} alt={'logo'}/>

    </HeaderWrapper>
}

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import headerIcon from '../../../assets/image/icon_logo.svg'

export const HeaderApp = () => {
    // const dispatch = useAppDispatch()
    // const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    // const LogoutHandler = useCallback(() => {
    //     dispatch(logoutTC())
    // }, [dispatch])

    return <Box sx={{flexGrow: 1}}>
        <AppBar position="static" color={'transparent'}>
            <Toolbar disableGutters sx={{justifyContent: 'space-between', p: '0 68px'}}>
                <img src={headerIcon} alt={'logo'}/>
                {<Button sx={{borderRadius: '10%'}} variant={'contained'} color="primary">Sing in</Button>}
            </Toolbar>
        </AppBar>
    </Box>
}

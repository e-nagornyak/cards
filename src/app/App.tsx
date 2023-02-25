import React, {useEffect} from 'react';
import {RoutesPage} from '../common/components/routes/RoutesPage';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {CircularProgress, createTheme, Modal, ThemeProvider} from '@mui/material';
import {initializeAppTC} from './app-reducer';
import {ErrorSnackbar} from '../features/errorSnackBar/ErrorSnackBar';
import {HeaderApp} from "../features/header/HeaderApp";

import './App.css';
import {Animation} from "../features/animation/Animation";

const theme = createTheme({
    palette: {
        secondary: {
            main: '#212042'
        },
    },
});

export const App = () => {
    console.log('App rendering')
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)


    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <div className={'circular-progress'}>
            <CircularProgress size={80}/>
        </div>
    }

    return <div className="App">
        <ThemeProvider theme={theme}>
            <HeaderApp/>
            <Modal open={status === 'loading'}><><Animation/></>
            </Modal>
            <ErrorSnackbar/>
            <main className='main'>
                <RoutesPage/>
            </main>
        </ThemeProvider>
    </div>
}


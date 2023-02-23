import React, {useEffect} from 'react';
import {RoutesPage} from '../common/components/routes/RoutesPage';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {CircularProgress, LinearProgress} from '@mui/material';
import {initializeAppTC} from './app-reducer';
import {ErrorSnackbar} from '../features/errorSnackBar/ErrorSnackBar';
import {HeaderApp} from "../features/header/HeaderApp";

import './App.css';

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
        <HeaderApp/>
        {status === 'loading' && <LinearProgress color="secondary"/>}
        <ErrorSnackbar/>
        <main className='main'>
            <RoutesPage/>
        </main>
    </div>
}


import React, {useEffect} from 'react';
import {RoutesPage} from '../common/components/routes/RoutesPage';
import {HeaderApp} from '../common/components/header/HeaderApp';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {CircularProgress, LinearProgress} from '@mui/material';
import {initializeAppTC} from './app-reducer';
import './App.css';
import {AppWrapper, FormWrapper} from '../utils/StyledComponents/StyledComponents';
import {ErrorSnackbar} from '../features/ErrorSnackBar/ErrorSnackBar';

export const App = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        console.log('App rendering')
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div style={{width: '100%', position: 'fixed', top: '30%', textAlign: 'center'}}>
            <CircularProgress size={80}/>
        </div>
    }

    return <div className="App">
        <HeaderApp/>
        {status === 'loading' && <LinearProgress color="secondary"/>}
        <AppWrapper>
            <ErrorSnackbar/>
            <FormWrapper>
                <RoutesPage/>
            </FormWrapper>
        </AppWrapper>
    </div>
}

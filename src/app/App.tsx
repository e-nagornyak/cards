import React, {useEffect} from 'react';
import {HashRouter} from "react-router-dom";
import {RoutesPage} from "../common/components/routes/RoutesPage";
import {HeaderApp} from "../common/components/header/HeaderApp";
import './App.css';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {CircularProgress} from "@mui/material";
import {initializeAppTC} from "./reducer/app-reducer";


export const App = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(()=>{
        dispatch(initializeAppTC())
    })

    if (!isInitialized) {
        return <div style={{width: "100%", position: 'fixed', top: "30%", textAlign: 'center'}}>
            <CircularProgress size={80}/>
        </div>
    }


    return <div className="App">
        <HashRouter>
            <HeaderApp/>
            <RoutesPage/>
        </HashRouter>
    </div>
}


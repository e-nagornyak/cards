import React from 'react';
import {HashRouter} from "react-router-dom";
import {RoutesPage} from "../common/components/routes/RoutesPage";
import {HeaderApp} from "../common/components/header/HeaderApp";
import './App.css';


export const App = () => {
    return <div className="App">
        <HashRouter>
            <HeaderApp/>
            <RoutesPage/>
        </HashRouter>
    </div>
}


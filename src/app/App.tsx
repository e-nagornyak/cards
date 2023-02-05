import React from 'react';
import {HashRouter} from "react-router-dom";
import './App.css';

import {Header} from "../common/components/header/Header";
import {RoutesPage} from "../common/components/routes/RoutesPage";

export const App = () => {
    return <div className="App">
        <HashRouter>
            <Header/>
            <hr/>
            <RoutesPage/>
        </HashRouter>
    </div>
}


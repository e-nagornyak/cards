import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {Login} from "../../../features/auth/login/Login";
import {Signup} from "../../../features/auth/signup/Signup";
import {Profile} from "../../../features/profile/Profile";
import {Page404} from "../page404/Page404";
import {NewPassword} from "../../../features/auth/new-password/NewPassword";
import {ForgotPassword} from "../../../features/auth/forgot-password/ForgotPassword";

export const RoutesPage = () => {
    return <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/new-password' element={<NewPassword/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/404' element={<Page404/>}/>
        <Route path='/' element={<Navigate to='/profile'/>}/>
        <Route path='*' element={<Navigate to='/404'/>}/>
    </Routes>
};


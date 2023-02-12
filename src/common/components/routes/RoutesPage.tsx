import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {Profile} from '../../../features/profile/Profile';
import {Page404} from '../page404/Page404';
import {CheckEmail} from '../../../features/auth/Check-email';
import {Login} from "../../../features/auth/login/Login";
import {Signup} from "../../../features/auth/signup/Signup";
import {NewPassword} from "../../../features/auth/new-password/New-password";
import {ForgotPassword} from "../../../features/auth/forgot-password/Forgot-password";
import {Packs} from "../../../features/packs/Packs";

export const RoutesPage = () => {
    return <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/pack-list" element={<h1>Is`s packlist</h1>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/packs" element={<Packs/>}/>
        <Route path="/set-new-password/:token" element={<NewPassword/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/forgot-password/check-email" element={<CheckEmail/>}/>
        <Route path="/" element={<Navigate to="/profile"/>}/>
        <Route path="/404" element={<Page404/>}/>
        <Route path="*" element={<Navigate to="/404"/>}/>
    </Routes>
};


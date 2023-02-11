import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {Signup} from '../../../features/auth/Signup';
import {Profile} from '../../../features/profile/Profile';
import {Page404} from '../page404/Page404';
import {NewPassword} from '../../../features/auth/New-password';
import {ForgotPassword} from '../../../features/auth/Forgot-password';
import {CheckEmail} from '../../../features/auth/Check-email';
import {Login} from '../../../features/auth/Login';
import {FormWrapper} from '../../../utils/StyledComponents/StyledComponents';
import Packs from '../../../features/packs/Packs';

export const RoutesPage = () => {
    return <Routes>
        <Route path="/login" element={<Login/>}/>
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


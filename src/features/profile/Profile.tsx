import React, {FC} from 'react';
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

export const Profile: FC = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)


    if (!isLoggedIn){
        return <Navigate to={'/login'} />
    }

    return <div>
        <h1>It`s Profile!</h1>
    </div>
};


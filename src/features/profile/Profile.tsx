import React, {FC, useEffect} from 'react';
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {ChangeIconWrapper,  ProfileIcon} from "../../utils/StyledComponents/StyledComponents";
import avatar from '../../assets/image/avatar.png'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import {fetchProfileTC, updateNameTC} from "./profile-reducer";
import {EditableSpan} from "../EditableSpan";
import {logoutTC} from "../auth/auth-reducer";

export const Profile: FC = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const profile = useAppSelector(state => state.profile)

    useEffect(() => {
        dispatch(fetchProfileTC())
    },[])

    if (!isLoggedIn) return <Navigate to={'/login'}/>

    // dispatch(updateAvatarTC(avatar))
    const changePhotoHandler = () => alert('Avatarka')
    const changeTitleHandler = (title: string) => dispatch(updateNameTC(title))
    const logoutHandler = () => dispatch(logoutTC())

    return <>
        <h2>Personal Information</h2>
        <div style={{position: 'relative'}}>
            {/*<ProfileIcon src={profile.avatar ? profile.avatar : avatar} alt="avat"/>*/}
            <ProfileIcon src={avatar} alt="avat"/>
            <ChangeIconWrapper onClick={changePhotoHandler}>
                <PhotoCameraIcon sx={{color: 'white'}}/>
            </ChangeIconWrapper>
        </div>

        <EditableSpan onChange={changeTitleHandler} title={profile.name}></EditableSpan>
        <p>{profile.email}</p>
        <button onClick={logoutHandler}>Log Out</button>
    </>
};


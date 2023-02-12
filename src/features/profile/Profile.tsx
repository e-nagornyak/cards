import React, {FC} from 'react';
import {Navigate, NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {ChangeIconWrapper, FormWrapper, ProfileIcon} from '../../utils/StyledComponents/StyledComponents';
import avatar from '../../assets/image/avatar.png'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import {updateNameTC} from './profile-reducer';
import {EditableSpan} from '../EditableSpan';
import {logoutTC} from '../auth/auth-reducer';
import arrow from '../../assets/image/Lesson 1/arrow.svg'
import './../../utils/style/style.css'

export const Profile: FC = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const profile = useAppSelector(state => state.profile)

    // useEffect(() => {
    //     dispatch(fetchProfileTC())
    // }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    // dispatch(updateAvatarTC(avatar))
    const changePhotoHandler = () => alert('Avatarka')
    const changeTitleHandler = (title: string) => dispatch(updateNameTC(title))
    const logoutHandler = () => dispatch(logoutTC())

    return <>
        <div className={'profile-back-packs'}>
            <img src={arrow} alt="arrow"/>
            <NavLink className={'profile-link-to-back'} to={'/packs'}>
                Back to Packs List
            </NavLink>
        </div>

        <FormWrapper>
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
        </FormWrapper>
    </>
};

